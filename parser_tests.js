describe('english parser', function() {
    it('can tokenize two simple words', function() {
        expect(parse('two words')).toEqual({
            word_count: 2,
            sentence_count: 1,
            words: ['two', 'words']
        });
    });

    it('can tokenize words with punctuation', function() {
        expect(parse('two, words')).toEqual({
            word_count: 2,
            sentence_count: 1,
            words: ['two', 'words']
        });
    });

    it('can tokenize sentences with periods', function() {
        expect(parse('first one. second one')).toEqual({
            word_count: 4,
            sentence_count: 2,
            words: ['first', 'one', 'second', 'one']
        });
    });

    it('can tokenize sentences with questions', function() {
        expect(parse('first one? second one')).toEqual({
            word_count: 4,
            sentence_count: 2,
            words: ['first', 'one', 'second', 'one']
        });
    });

    it('can tokenize sentences with exclamations', function() {
        expect(parse('first one! second one')).toEqual({
            word_count: 4,
            sentence_count: 2,
            words: ['first', 'one', 'second', 'one']
        });
    });

    it('can tokenize sentences with exclamations and punctuation', function() {
        expect(parse('first, one! second: one')).toEqual({
            word_count: 4,
            sentence_count: 2,
            words: ['first', 'one', 'second', 'one']
        });
    });
});

