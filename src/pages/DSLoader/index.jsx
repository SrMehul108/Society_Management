import clsx from "clsx";
// import styles from "../../assets/css/DSLoader/DSLoader.css";

 const DSLoader = () => {
  return (
    <>
      <div className={clsx(styles.body)}>
        <div className={clsx(styles.loader)}>
          <svg className={styles.circular} viewBox="25 25 50 50">
            <circle
              className={styles.path}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            ></circle>
          </svg>
        </div>
      </div>
    </>
  );
};
export default DSLoader;