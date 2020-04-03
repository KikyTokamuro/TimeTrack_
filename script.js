const task  = document.getElementById("task"),
      timer = document.getElementById("timer"),
      hist  = document.getElementById("history"),
	  start = document.getElementById("start"),
	  stop  = document.getElementById("stop"),
	  reset = document.getElementById("reset"),
	  save  = document.getElementById("save"),
	  clear = document.getElementById("clear"),
	  exp   = document.getElementById("export");

let sec  = 0,
	min  = 0,
	hour = 0,
	timerId;

const timerProcess = () => {
	sec++;

	if (sec >= 60) {
        sec = 0;
        min++;
        
        if (min >= 60) {
            min = 0;
            hour++;
        }
    }

    let h = (hour ? (hour > 9 ? hour : "0" + hour) : "00"),
    	m = (min ? (min > 9 ? min : "0" + min) : "00"),
    	s = (sec > 9 ? sec : "0" + sec); 

    timer.textContent = `${h}:${m}:${s}`;

    startTimer();
}

const startTimer = () => {
	timerId = setTimeout(timerProcess, 1000);
}

const stopTimer = () => {
	clearTimeout(timerId);
}

const saveTimer = () => {
	let taskname   = (task.value == "") ? "Empty Task" : task.value.replace(/<[^>]*>/g, ''),
		timerstate = timer.textContent,
		history    = `<tr><td>${taskname}</td><td>${timerstate}</td</tr>`;

	clearTimer();

	hist.innerHTML += history;
}

const clearTimer = () => {
	timer.textContent = "00:00:00";
	sec  = 0;
	min  = 0;
	hour = 0;
}

const clearHistory = () => {
	hist.textContent = "";
}

const exportHistory = () => {
	let table = document.getElementById("history-table");
	exportTableToCSV(table, "table.csv");
}

start.onclick = startTimer;
stop.onclick  = stopTimer;
reset.onclick = clearTimer;
save.onclick  = saveTimer;
clear.onclick = clearHistory;
exp.onclick   = exportHistory;