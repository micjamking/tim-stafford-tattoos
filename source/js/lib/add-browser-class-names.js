const useragent = require('airkit/utils/useragent');

const browserTests = [
  'isAndroid', 'isChrome', 'isFirefox', 'isIOS', 'isIE', 'isIEorEdge',
  'isMobile', 'isSafari'
];

class AddBrowserClassNames {
  constructor(element) {
    browserTests.forEach(function(browserTest) {
      useragent[browserTest]() && element.classList.add(browserTest);
    });
  }
}

export default AddBrowserClassNames;
