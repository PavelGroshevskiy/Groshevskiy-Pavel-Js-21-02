import { IMGBB_APIKEY,
  IMGBB_EXPIRE,
  IMGBB_METHOD,
  IMGBB_PARAMEXPIRE,
  IMGBB_PARAMIMAGE,
  IMGBB_PARAMKEY,
  IMGBB_URL } from '../constants/api/imgDbApi';

export const uploadAvatar = (file: Blob) => {
  const formData = new FormData();
  formData.set(IMGBB_PARAMEXPIRE, IMGBB_EXPIRE.toString());
  formData.set(IMGBB_PARAMKEY, IMGBB_APIKEY);
  formData.set(IMGBB_PARAMIMAGE, file);

  return fetch(IMGBB_URL, {
    method: IMGBB_METHOD,
    body: formData,
  }).then((response) => response.json())
    .then(console.log);
};
