import { createSlice } from "@reduxjs/toolkit";

const displayedVenueStageSlice = createSlice({
  name: "displayedVenueStage",
  initialState: {
    stage: 0,
    allStagesAreValid: false,
    submitAttempted: false,
    stageData: {
      stage1: {},
      stage2: {},
      stage3: {},
      stage4: [],
      stage5: {},
      stage6: {
        coverPhoto: {
          img: null,
          description: "",
        },
        photo1: {
          img: null,
          description: "",
        },
        photo2: {
          img: null,
          description: "",
        },
        photo3: {
          img: null,
          description: "",
        },
        photo4: {
          img: null,
          description: "",
        },
        photo5: {
          img: null,
          description: "",
        },
        photo6: {
          img: null,
          description: "",
        },
        photo7: {
          img: null,
          description: "",
        },
        photo8: {
          img: null,
          description: "",
        },
      },
    },
  },
  reducers: {
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    incrementStage: (state) => {
      state.stage = state.stage + 1;
    },
    decrementStage: (state) => {
      state.stage = state.stage - 1;
    },
    updateStageData: (state, action) => {
      const { stage, data } = action.payload;
      state.stageData[`stage${stage}`] = data;
    },
    setAllStagesAreValid: (state, action) => {
      state.allStagesAreValid = action.payload;
    },
    submitAttempted: (state, action) => {
      state.submitAttempted = action.payload;
    },
  },
});

export const {
  setStage,
  incrementStage,
  decrementStage,
  updateStageData,
  setAllStagesAreValid,
  submitAttempted,
} = displayedVenueStageSlice.actions;
export default displayedVenueStageSlice.reducer;
