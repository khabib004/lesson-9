import * as yup from "yup";

const personSchema = yup.object().shape({
  name: yup.string().required("Please fill !"),
  age: yup.number().required().positive().integer(),
  email: yup.string().email("Email must be like this abdulaziz@gmail.com"),
  website: yup.string().url(),
  date: yup.date().default(function () {
    return new Date();
  }),
});

const YupPage = () => {
  const submit = async (e) => {
    try {
      e.preventDefault();
      let person = {
        name: e.target.name.value,
        age: e.target.age.value,
        email: e.target.email.value,
        website: e.target.website.value,
        date: e.target.date.value,
      };
      // let res = await personSchema.isValid(person);
      // console.log(res);

      // let res = await personSchema.validate(person);
      // console.log(res);
      console.log(person);
      let res = personSchema.cast(person);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="container mt-4" onSubmit={submit}>
      <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="date">Created at</label>
        <input type="date" id="date" name="date" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </form>
  );
};

export default YupPage;
