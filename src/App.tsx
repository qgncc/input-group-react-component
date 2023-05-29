import "./App.scss";
import "./Form.scss";
import { Field, InputGroup } from "./components/InputGroup/InputGroup";
import { useInputGroup } from "./components/InputGroup/useInputGroup";
import { Button } from "./components/Button";
import img from "./img/icon.png";

function App() {
  let fields: Field[] = [
    {
      id: "first_name",
      type: "inputText",
      label: "First Name",
      defaultValue: "Some first name",
    },
    {
      id: "last_name",
      type: "inputText",
      label: "Last Name",
    },
    {
      id: "email",
      type: "inputEmail",
      label: "Email",
      required: true,
    },
    {
      id: "password",
      type: "inputPassword",
      label: "Password",
      required: true,
    },
  ];
  let controller = useInputGroup(fields);
  return (
    <div className="app">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          alert("Submit!");
        }}
        className="form app__form"
      >
        <img className="form__logo" src={img} alt="" />
        <InputGroup
          onChange={(id, value) => {
            console.log(id, value);
          }}
          controller={controller}
        />
        <Button
          disabled={!controller.isFieldsValid()}
          submit
          className="form__button"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
