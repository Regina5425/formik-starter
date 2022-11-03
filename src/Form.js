import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Минимум 2 символа!")
          .required("Обязательное поле!"),
        email: Yup.string()
          .email("Неправильный email адрес")
          .required("Обязательное поле!"),
        amount: Yup.number()
          .min(5, "Не менее 5")
          .required("Обязательное поле!"),
        currency: Yup.string().required("Выберите валюту"),
        text: Yup.string().min(10, "Не менее 10 символов"),
        terms: Yup.boolean()
          .required("Необходимо согласие!")
          .oneOf([true], "Необходимо согласие!"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className='form'>
        <h2>Заполнить форму</h2>
				<MyTextInput label='Ваше имя' id='name' name='name' type='text' />
        <label htmlFor='email'>Ваша почта</label>
        <Field id='email' name='email' type='email' />
        <ErrorMessage className='error' name='email' component='div' />
        <label htmlFor='amount'>Количество</label>
        <Field id='amount' name='amount' type='number' />
        <ErrorMessage className='error' name='amount' component='div' />
        <label htmlFor='currency'>Валюта</label>
        <Field id='currency' name='currency' as='select'>
          <option value=''>Выберите валюту</option>
          <option value='USD'>USD</option>
          <option value='RUB'>RUB</option>
        </Field>
        <ErrorMessage className='error' name='currency' component='div' />
        <label htmlFor='text'>Ваше сообщение</label>
        <Field id='text' name='text' as='textarea' />
        <ErrorMessage className='error' name='text' component='div' />
        <label className='checkbox'>
          <Field name='terms' type='checkbox' />
          Соглашаетесь с политикой конфиденциальности?
        </label>
        <ErrorMessage className='error' name='terms' component='div' />
        <button type='submit'>Отправить</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
