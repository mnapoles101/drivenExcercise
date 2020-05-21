import * as Yup from "yup";

const validationSchema = () => {
  return Yup.object().shape({
    input: Yup.number().required("Please Submit a Number"),
  });
};

export default validationSchema;
