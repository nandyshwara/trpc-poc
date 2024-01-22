import { Formik, Form, ErrorMessage } from "formik";
import { client } from "../../client";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";


interface signupFromValues {
  name: string;
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function Signup() {
  const handleNavigate = useNavigate();
  const initialValues: signupFromValues = { name: "", email: "", password: "" };

  const handleSubmit = async ({
    inputdata,
  }: {
    inputdata: signupFromValues;
  }) => {
    try {
      const data = await client.user.signup.mutate(inputdata);
      if (data) {
        localStorage.setItem("trpc_cred", JSON.stringify(data.token));
        handleNavigate("/products");
        toast.success("registered Successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="my-10 flex flex-col gap-y-5">
      <p className="mx-auto text-3xl font-bold">Signup Form</p>
      <div className="w-2/5 mx-auto bg-[#3198e7bf] py-10 px-5 rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleSubmit({ inputdata: values });
          }}
        >
          <Form>
            <div className="flex flex-col text-xl font-semibold">
              <TextInput
                className="p-2 mt-2 rounded-md"
                name="name"
                id="name"
                placeholder="Name"
              />
              <ErrorMessage name="name" component="p" />
              <TextInput name="gender" options={["male","female"]} inputType="select" />
              <TextInput
                className="p-2 mt-2 rounded-md"
                name="email"
                id="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="p" />
              <TextInput
                className="p-2 mt-2 rounded-md"
                name="password"
                id="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="p" />
              <button
                className="bg-white rounded-xl w-1/2 mx-auto mt-10 text-xl font-bold py-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
