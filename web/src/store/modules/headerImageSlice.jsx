import { createSlice } from '@reduxjs/toolkit';

const headerImageSlice = createSlice({
  name: 'headerImage',
  initialState: {
    imageDesktop: null,
    imageMobile: null,
  },

  reducers: {
    SET_SINGLE_IMAGE_DESKTOP: (state, action) => {
      state.imageDesktop = action.payload;
    },
    SET_SINGLE_IMAGE_MOBILE: (state, action) => {
      state.imageMobile = action.payload;
    },
  },
});

export default headerImageSlice.reducer;

export const { SET_SINGLE_IMAGE_DESKTOP, SET_SINGLE_IMAGE_MOBILE } = headerImageSlice.actions;

export const fetchSingleImage = (orientation) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    //! fix loading later */
    // dispatch(setLoadingState(true));
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=travel,vacation,beach,nature&content_filter=high&orientation=${orientation}`,
        {
          headers: {
            Authorization: 'Client-ID -auV612_C-xmYNvlEHSXXYKHM3rZbnbEGYzoLq9gS3g',
          },
        }
      );
      const data = await response.json();
      const timestamp = Date.now();

      if (orientation === 'portrait') {
        dispatch(
          SET_SINGLE_IMAGE_MOBILE({ urls: data.urls, alt_description: data.alt_description })
        );

        const mobileImage = data.urls.full;
        const mobileImageDesc = data.alt_description;

        localStorage.setItem(
          'mobileImage',
          JSON.stringify({ image: mobileImage, altText: mobileImageDesc, timestamp: timestamp })
        );
      } else if (orientation === 'landscape') {
        dispatch(
          SET_SINGLE_IMAGE_DESKTOP({ urls: data.urls, alt_description: data.alt_description })
        );

        const desktopImage = data.urls.full;
        const desktopImageDesc = data.alt_description;

        localStorage.setItem(
          'desktopImage',
          JSON.stringify({ image: desktopImage, altText: desktopImageDesc, timestamp: timestamp })
        );
      }

      console.log(data);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
