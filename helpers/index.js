/**
 * Youtube video url parser
 * Supported format
 * http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
 * http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
 * http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
 * http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
 * http://www.youtube.com/embed/0zM3nApSvMg?rel=0
 * http://www.youtube.com/watch?v=0zM3nApSvMg
 * http://youtu.be/0zM3nApSvMg
 *
 * @param url
 * @returns {boolean}
 */
export function youtube_parser(url) {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  let match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

export function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
