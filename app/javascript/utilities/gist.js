export function embedGists() {
  const waitingOnPostscribe = setInterval(() => {
    clearInterval(waitingOnPostscribe);
    const gistTags = document.querySelectorAll('.ltag_gist-liquid-tag');

    // Only load scripts for gists if needed
    if (gistTags.length > 0) {
      import('postscribe').then(({ default: postscribe }) => {
        for (const gistTag of gistTags) {
          postscribe(gistTag, gistTag.firstElementChild.outerHTML, {
            beforeWrite: function (context) {
              return function (text) {
                if (context.childElementCount > 3) {
                  return "";
                }
                return text;
              }
            }(gistTag)
          });
        }
      });
    }
  }, 500);
}

export function embedGistsInComments() {
  // allows for getting the gist embed after new comment submit and preview
  const commentForm = document.getElementById("new_comment");
  const previewBtn = document.getElementsByClassName('preview-toggle')[0];
  const dismissBtn = document.querySelector('.dismiss-comment');

  if (commentForm && typeof commentForm !== "undefined") {
    commentForm.addEventListener("submit", (_event) => {
      embedGists();
    });
  }

  if (previewBtn && typeof previewBtn !== "undefined") {
    previewBtn.addEventListener("click", (_event) => {
      embedGists();
    });
  }

  if (dismissBtn && typeof dismissBtn !== "undefined") {
    dismissBtn.addEventListener("click", (_event) => {
      embedGists();
    });
  }
}