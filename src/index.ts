export type Local = string;
export type Domain = string;
export type EmailAddress = `${Local}@${Domain}`;

export default function validate(email: EmailAddress) {
    /**
     * @todo
     * 1. Check if email is a string
     * 2. Check if email is a valid email
     * 3. Check if DNS has MX record
     * 4. Check if email server is accepting emails
     * 5. Check if email server knows the email address
     * 6. Check if email server is accepting emails from the email address
     */

    return validateEmailAddress(email);
}

export function validateEmailAddress(email: EmailAddress) {
    return true;
}