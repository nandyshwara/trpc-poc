import { Formik, Form, Field } from "formik";
import { client } from "../../client";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate} from "react-router-dom"
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
    const handleNavigate = useNavigate()
  const initialValues: LoginFormValues = { email: "", password: "" };

  const handleSubmit = async ({
    inputdata,
  }: {
    inputdata: LoginFormValues;
  }) => {
    try {
      const data = await client.user.login.mutate(inputdata);
      if(data){
        console.log(data)
        localStorage.setItem("trpc_cred",JSON.stringify(data.token))
        handleNavigate("/products")
        toast.success("Login Successfully");
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  };

  return (
    <div className="my-10 flex flex-col gap-y-5">
      <p className="mx-auto text-3xl font-bold">Login Form</p>
      <div className="w-6/12 mx-auto bg-[#3198e7bf] py-10 px-5 rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleSubmit({ inputdata: values });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col text-xl font-semibold">
                <div className="my-5 flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field
                    className="mt-2 rounded-md"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>
                <div className="my-5 flex flex-col">
                  <label htmlFor="password">Password</label>
                  <Field
                    className="mt-2 rounded-md"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
                <button
                  className="bg-white rounded-xl w-1/2 mx-auto mt-10 text-xl font-bold py-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
