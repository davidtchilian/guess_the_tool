const tool_names = [
    "aircrack-ng",
    "chmod",
    "ffuf",
    "hydra",
    "john",
    "katana",
    "ls",
    "msfconsole",
    "netcat",
    "nmap",
    "nuclei",
    "ssh",
    "sudo",
    "vim",
    "wget",
    "curl",
    "git",
    "openvpn"
];

function get_tool_help(){
    const tool_name = tool_names[Math.floor(Math.random() * tool_names.length)];
    const tool_path = "./tools/" + tool_name;

    fetch(tool_path)
    .then(response => response.text())
    .then(data => {
        let lines = data.split("\n");
        let selected_lines = [];
        let start = Math.floor(Math.random() * (lines.length - 5));
        for (let i = start; i < start + 5; i++) {
            selected_lines.push(lines[i]);
        }
        selected_string = selected_lines.join("\n");
        var i = 0;
        while (selected_string.includes(tool_name)) {
            let start = Math.floor(Math.random() * (lines.length - 5));
            i++;
            if (i > 100) {
                console.log("Too many iterations, tool name: " + tool_name);
                break;
            }
            selected_lines = [];
            for (let i = start; i < start + 5; i++) {
                selected_lines.push(lines[i]);
            }
            selected_string = selected_lines.join("\n");
        }
        document.getElementById("tool_desc").innerHTML = selected_string;
    });

    let random_tool_names = [];
    while (random_tool_names.length < 3) {
        let random_tool_name = tool_names[Math.floor(Math.random() * tool_names.length)];
        if (!random_tool_names.includes(random_tool_name) && random_tool_name !== tool_name) {
            random_tool_names.push(random_tool_name);
        }
    }
    random_tool_names.push(tool_name);
    let buttons = [];
    for (let i = 0; i < 4; i++) {
        let tool = random_tool_names.pop();
        if (tool === tool_name) {
            buttons.push(`
            <div class="col-3">
                <button class="btn btn-warning" onclick="win()">${tool}</button>
            </div>`);
        } else {
            buttons.push(`
            <div class="col-3">
                <button class="btn btn-warning" onclick="lose()">${tool}</button>
            </div>`);
        }
    }
    buttons.sort(() => Math.random() - 0.5);
    document.getElementById("proposition_buttons").innerHTML = buttons.join("");
}
function win(){
    document.getElementById("result").innerHTML = "You Win!";
    document.getElementById("result").style.color = "green";
}

function lose(){
    document.getElementById("result").innerHTML = "Nope!";
    document.getElementById("result").style.color = "red";
}

get_tool_help();