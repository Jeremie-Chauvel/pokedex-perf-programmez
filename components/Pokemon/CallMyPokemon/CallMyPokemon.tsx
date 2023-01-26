import styles from "./CallMyPokemon.module.css";
import { FormEvent } from "react";
import { parsePhoneNumber, PhoneNumber } from "libphonenumber-js/max";
type CustomElements = HTMLFormControlsCollection & {
  phoneNumber: HTMLInputElement;
};

type CustomForm = HTMLFormElement & {
  readonly elements: CustomElements;
};

export default function CallMyPokemon() {
  return (
    <div className={styles.callMyPokemon}>
      <h2 className={styles.title}>Call My Pokemon</h2>
      <form
        className={styles.form}
        onSubmit={(event: FormEvent<CustomForm>) => {
          event.preventDefault();

          const target = event.currentTarget.elements;
          const phoneNumberRawValue = target.phoneNumber.value;
          let phoneNumber: PhoneNumber | undefined;
          try {
            phoneNumber = parsePhoneNumber(phoneNumberRawValue, "FR");
          } catch (e) {
            console.log(e);
            return;
          }

          if (phoneNumber === undefined || !phoneNumber.isValid()) {
            return;
          }
          alert(`Calling ${phoneNumber.formatInternational()}`);
        }}
      >
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
        />
        <button type="submit">Call</button>
      </form>
    </div>
  );
}
