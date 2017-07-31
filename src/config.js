const googleApiKey = 'xxx';

export const apiUrls = {
  cloudVision: 'https://vision.googleapis.com/v1/images:annotate?key=' + googleApiKey,
  translate:   'https://www.googleapis.com/language/translate/v2?key=' + googleApiKey
};

export const langList = [
  'german', 'english'
];