import {describe} from "node:test";
import {validateEmailAddress} from "../index";

describe("Email Address Validations", () => {
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

})
