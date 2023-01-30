import {describe} from "node:test";
import {EmailAddress, validateEmailAddress} from "../index";

describe("Email Address Validations", () => {

    test("Email address must contain @", () => {
        // Arrange
        /*
         * Cast to an EmailAddress type to bypass the type check, allowing us
         * to simulate invalid user input.
         */
        const simpleEmail = "a" as EmailAddress;

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(false);
    });

    test("Email address must contain a local part", () => {
        // Arrange
        const simpleEmail = "@a";

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(false);
    });

    test("Email address must contain a domain part", () => {
        // Arrange
        const simpleEmail = "a@";

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(false);
    });

    test("Email address must not exceed 64 characters", () => {
        // Arrange
        const simpleEmail = "a".repeat(64) + "@a" as EmailAddress;

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(false);
    });

    test("Email address with only quoted @ is invalid", () => {
        // Arrange
        const simpleEmail = 'user"@"com';

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(false);
    });

    test("Email address with quoted @ is valid", () => {
        // Arrange
        const simpleEmail = 'user"@"@com';

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(true);
    });

    /**
     * Root TLDs e.g., .com can be used as a domain, therefore an email from
     * a@com is valid. Further, the registration of new TLDs is not restricted, so we
     * can't assume that a TLD is invalid just because it's not in the list of TLDs.
     */
    test("Email address for root tld is valid", () => {
        // Arrange
        const simpleEmail = "a@a";

        // Act
        const isValid = validateEmailAddress(simpleEmail);

        // Assert
        expect(isValid).toEqual(true);
    });
});
