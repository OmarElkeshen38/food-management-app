import styles from "./AuthButton.module.css";

function AuthButton({ title }) {
  return <button className={`btn w-100 ${styles.authBtn}`}>{title}</button>;
}

export default AuthButton;
