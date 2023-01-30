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
    if (!email.includes("@")) {
        return false;
    }

    const split = (email: string, local?: Local, domain?: Domain, quoted: boolean = false): [string?, string?] => {
        if (email.length === 0) {
            return [local, domain];
        }

        const [head, ...tail] = email;

        if (head === '"') {
            quoted = !quoted;
        }

        if (head === "@" && !quoted) {
            return split("", local, tail.join(""), quoted);
        }

        return split(tail.join(""), local + head, "", quoted);
    };

    // Split the email address into local and domain parts using the first @ symbol that isn't enclosed in quotes.
    const [local, domain] = split(email);

    if (!local || !domain)
    {
        return false;
    }

    if (!validateLocalPart(local)) {
        return false;
    }

    return domain.length !== 0;
}

export function validateLocalPart(local: Local) {
    if (local.length === 0 || local.length > 64) {
        return false;
    }

    if (local.startsWith(".") || local.endsWith(".")) {
        return false;
    }

    return true;
}