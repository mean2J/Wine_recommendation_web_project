import mongoose from "mongoose";
const {Schema, model} = mongoose;

const StatSchema = new Schema({
    id: {
      type: Number,
      required: true
    },
    class: {
      type: String,
      require: false
    },
    labels: {
      type: Array,
      required: true
    },
    y_ax: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: false
    },


});
  
const StatModel = model("Stat", StatSchema);
  
export {StatModel};
