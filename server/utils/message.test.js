const expect = require('expect');
const { generateMessage, generateLocationMessage } = require("./message");


describe('generateMessage', () => {
    it('should generate the correct object message', () => {
        let from = 'jen';
        let text = 'Some message';

        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Andrew';
        let latitude = 1;
        let longitude = 1;
        let url = `https://www.google.com/maps?q=1,1`;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
    });
})