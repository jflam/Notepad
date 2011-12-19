// Initialize Ace editor

is_word_in_dictionary = function(word)
{
    if (dictionary[word])
        return true;
    else
        return false;
}

initialize_ace = function() 
{
    var editor = ace.edit("editor");
    var count = 0;
    var keystroke_count = document.getElementById("keystroke_count");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().on('change', function() {
        count += 1;
        keystroke_count.innerHTML = count;
    });
    if (is_word_in_dictionary("begin")) {
        keystroke_count.innerHTML = "yay";
    }
}

// Run the algorithm

window.onload = function()
{
    initialize_ace();
}
