String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

is_word_in_dictionary = function(word)
{
    if (dictionary[word.toLowerCase()])
        return true;
    else
        return false;
}

get_word_list = function(text) 
{
    var list = text.split(/\s+/);
    return list;
}

get_sentences_list = function(text)
{
    var list = text.split(/\.\s/);
    return list;
}

compute_percentage_difficult_words = function(words)
{
    var count = 0;
    for (i = 0; i < words.length; i++) 
    {
        if (!is_word_in_dictionary(words[i]))
        {
            count += 1;
        }
    }
    return count / words.length;
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
        var text = editor.getSession().getValue().trim();
        var words = get_word_list(text);
        var sentences = get_sentences_list(text);
        var average_sentence_length = words.length / sentences.length;
        var percentage_difficult_words = compute_percentage_difficult_words(words);
        var dale_chall =  0.1579 * percentage_difficult_words + 0.0496 * average_sentence_length + 3.6365;
        var output = "words: " + words.length + " | sentences: " + sentences.length + " | percentage_difficult_words: " + percentage_difficult_words.toFixed(2) + " | asl: " + average_sentence_length.toFixed(1) + " | dale-chall: " + dale_chall.toFixed(1);
        keystroke_count.innerHTML = output;
    });
}

// Run the algorithm

window.onload = function()
{
    initialize_ace();
}
