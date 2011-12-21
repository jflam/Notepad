var sentence_terminals = /[\.\!\?]/;
var word_terminals = /\s+/;

parse = function(text) {
    var words = 1;
    var sentences = 1;
    var word_list = [];
    var current_word = '';
    var in_word_whitespace = false;
    var in_sentence_whitespace = false;

    for(var i = 0; i < text.length; i++)
    {
        var c = text.charAt(i);

        // We trigger an increment in words if we transition from 
        // white space to non-whitespace characters.
        if (c === ' ' || c === '\t' || c === '\n' || c === '.' || c === ',' || c === ';' || c === ':' || c === '"' || c === '-') {
            in_word_whitespace = true;
            if (current_word !== '') {
                word_list.push(current_word);
                current_word = '';
            }
        }

        if (c === '.' || c === '!' || c === '?') {
            in_sentence_whitespace = true;
        }

        if ((c > 'a' && c <= 'z') || (c > 'A' && c <= 'Z')) {
            if (in_word_whitespace) {
                words++;
                in_word_whitespace = false;
            }

            if (in_sentence_whitespace) {
                sentences++;
                in_sentence_whitespace = false;
            }
            current_word += c;
        }
    }

    if (current_word !== '') {
        word_list.push(current_word);
    }

    return {
        word_count: words,
        sentence_count: sentences,
        words: word_list
    };
};
