String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.remove_punctuation = function() 
{
    var removed_dashes = this.replace(/[\-]/g, " ");
    return removed_dashes.replace(/[^a-z^\s]/g, "");
}

is_word_in_dictionary = function(word)
{
    if (dictionary[word])
        return true;
    else
        return false;
}

get_word_list = function(text) 
{
    return text.remove_punctuation().split(/\s+/);
}

get_sentences_list = function(text)
{
    return text.split(/[\.\?\!]\s/);
}

compute_percentage_difficult_words = function(words)
{
    var count = 0;
    for (i = 0; i < words.length; i++) 
    {
        var word = words[i];
        if (!is_word_in_dictionary(word))
        {
            console.debug(word);
            count += 1;
        }
    }
    return count / words.length * 100;
}

initialize_ace = function() 
{
    var ed = document.getElementById("editor");
    ed.style.fontSize = "16px";
    var editor = ace.edit("editor");
    var keystroke_count = document.getElementById("keystroke_count");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().on('change', function() {
        var text = editor.getSession().getValue().trim().toLowerCase();
        var words = get_word_list(text);
        var word_count = words.length + 1;
        var sentences = get_sentences_list(text);
        var sentence_count = sentences.length + 1;
        var average_sentence_length = word_count / sentence_count;
        var percentage_difficult_words = compute_percentage_difficult_words(words);
        var dale_chall =  0.1579 * percentage_difficult_words + 0.0496 * average_sentence_length + 3.6365;
        var output = "words: " + word_count + " | sentences: " + sentence_count + " | percentage_difficult_words: " + percentage_difficult_words.toFixed(2) + " | asl: " + average_sentence_length.toFixed(1) + " | dale-chall: " + dale_chall.toFixed(1);
        keystroke_count.innerHTML = output;
    });
}

window.onload = function()
{
    initialize_ace();
}
