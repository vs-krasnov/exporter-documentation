/*-----------------------------
    Search - Interface
------------------------------- */

$(".search").on("click", function (e) {
  // Toggle the search view when clicking the search icon
  $(".SNSearch").toggleClass("active")
  if ($(".SNSearch").is(".active")) {
    $(".SNSearch-input").focus()
    $(".SNSearch-results").html(`<p class="section-title empty">Start your search by typing your phrase</p>`)
  }
  e.preventDefault()
})

$(document).keyup(function (e) {
  // Hide the search view with escape key
  if (e.which == 27) $(".SNSearch").removeClass("active")
})

/*-----------------------------
    Search - Results and processing
------------------------------- */

$(".SNSearch-input").on("input", function (e) {

  let searchString = $(this).val()
  let resultObject = $(".SNSearch-results")
  
  // Don't search for small strings
  if (searchString.length < 2) {
    resultObject.html(`<p class="section-title empty">Start your search by typing your phrase</p>`)
    // No results
    return
  }

  let searchResult = lunrIndex.search(`*${searchString}*`)
  if (searchResult.length === 0) {
    // No result found
    resultObject.html(`<p class="section-title empty">No results found, change your search phrase</p>`)
    return
  }

  // Reset search
  resultObject.html("")

  // Prepare data
  let textResults = []
  let headingResults = []

  for (let result of searchResult) {
    let ref = result.ref
    let data = lunrIndexedData[ref]

    // Add engine index positions
    Object.keys(result.matchData.metadata).forEach(function (term) {
      Object.keys(result.matchData.metadata[term]).forEach(function (fieldName) {
        data["position"] = result.matchData.metadata[term][fieldName].position
      })
    })

    if (data.type === "body") {
      textResults.push(data)
    } else {
      headingResults.push(data)
    }
  }

  // Add results matching titles first, then text block results
  if (headingResults.length > 0) {
    resultObject.append(`<p class="section-title">Sections (${headingResults.length})</p>`)
    let count = 0;
    for (let heading of headingResults) {
      resultObject.append(`
        <a href="${heading.url}">
        <div class="result">
          <p class="section-result-header">${highlightRanges(heading.text, heading.position)}</p>
          <p class="section-result-text">On page ${heading.path}</p>
        </div>
        </a>`)
        // Allow up to 5 results to be shown
        if (++count > 5) {
          break;
        }
    }
  }

  // Add text block results
  if (textResults.length > 0) {
    resultObject.append(`<p class="section-title">Text (${textResults.length})</p>`)
    let count = 0;
    for (let text of textResults) {
      resultObject.append(`
        <a href="${text.url}">
        <div class="result">
          <p class="section-result-header">${highlightRanges(text.text, text.position)}</p>
          <p class="section-result-text">On page ${text.path}</p>
        </div>
        </a>`)
      // Allow up to 5 results to be shown
      if (++count > 5) {
        break;
      }
    }
  }
})

function highlightRanges(s, sortedRanges) {
  let result = s
  // We need to highlight from the last position, so we can use the ranges
  for (let range of sortedRanges) {
    result = replaceRange(result, range[1] + range[0], range[1] + range[0], "</span>")
    result = replaceRange(result, range[0], range[0], "<span>")
  }
  return result
}

function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end)
}


/*-----------------------------
    Versions
------------------------------- */

function loadVersions(url) {
  
  // Disable versions before they are loaded
  let button = $("#version-container button")
  button.css('pointer-events','none')
  
  // Download JSON with version definitions for this particular design system (there is always one version file per design system at domain/version.json)
  $.getJSON(url, function(data) {
    // Get versions
    let versions = data.versions

    // Load versions into the container and set active version
    let menu = $("#version-container .dropdown-menu")
  
    menu.html("")
    for (let v of versions) {
      // Make the version that fits the current deploy target URL to be the selected one
      let currentVersion = window.location.href.indexOf(v.url) !== -1
      menu.append(`<a class="dropdown-item ${currentVersion ? 'checked' : ''}" href="https:${v.url}">${v.name}</a>`)
      if (currentVersion) {
        button.html(`${v.name}`)
      }
    }
    
    // Enable interaction with the menu
    button.css('pointer-events','')
  })
  .fail(function() {
    // If we for some reason fail to download the versions or if the versions don't exist yet, just hide the button, so it doesn't confuse users
    button.hidden = true;
  });
}

