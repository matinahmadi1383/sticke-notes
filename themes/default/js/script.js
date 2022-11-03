var top = 60;
var right=10;
var ad=0;
$(function () {
	if ("note" in localStorage) {
	  creat();
	}
	if (localStorage.getItem("header")=="off")
	{
		$(".header").hide();
		$('#headerON').prop('checked', false);
	}
	else if(localStorage.getItem("header")=="on")
	{
		$(".header").show();
		$('#headerON').prop('checked', true);
	}
	$('#headerON').click(function () {
		if($(this).is(":checked")) 
		{
			$(".header").show();
			localStorage.setItem("header","on")
		}
		else
		{
			$(".header").hide();
			localStorage.setItem("header","off")
		}
	})
	$("#btn").click(function () {
		add();
	})
	$("body").on("click", '.close' ,function () {
		var id = $(this).parent().parent().attr('id')
		close(id);
	})
	$("body").on("click", '.edit' ,function () {
		var id = $(this).parent().parent().attr('id')
		edit(id);
	})
	$("body").on("click", '.save' ,function () {
		var id = $(this).parent().parent().attr('id')
		save(id);
	})
	$("body").on("click", '.info' ,function () {
		alert(", به معنای enter است");
	})
	$("body").on("change", '.select' ,function () {
		var id = $(this).attr('id')
		var color = $(this).val();
		change_bgColor(color,id-1)
	})
	$("body").on("change", '.select_txt' ,function () {
		var id = $(this).attr('id')
		var color = $(this).val();
		change_fgColor(color,id-2)
	})
	var zIndex=100;
	var lastID=[];
	var shomarandeh = 0;
	var j = 0;
	$("body").on("mousedown", '.note' ,function () {
		var id = $(this).attr('id');
		if (shomarandeh!=0)
			for (var i = 0; i < lastID.length; i++) {
				$(`#${lastID[i]}`).css({
					"z-index":10
				})
			}
		$(`#${id}`).css({
			"z-index": zIndex
		})
		if (shomarandeh!=0) 
			for (var i = 0; i < lastID.length; i++) {
				if (id==lastID[i]){
					j++;

				}
			}
		if (j==0){
			lastID[shomarandeh] = id;
			shomarandeh++;
		}
		j = 0;
	})
	$("body").on("click", '.checkboxDrag' ,function () {
		var id = $(this).attr('id')

			if($(this).is(":checked")) 
			{
				$(`.note[id=${id-3}]`).draggable('disable');
			}
			else
			{
				$(`.note[id=${id-3}]`).draggable('enable');
			}
	})
	var mousenterNote = false;
	$("body").on("mouseenter",".note",function () {
		if (localStorage.getItem("header")=="off" && mousenterNote==false)
		{
			let id = $(this).attr('id')
			setTimeout(function () {
				$(`#${id} .header`).fadeIn();
				mousenterNote = true;
			},500)
		}
	})
	$("body").on("mouseleave",".note",function () {
		if (localStorage.getItem("header")=="off" && mousenterNote==true)
		{
			let id = $(this).attr('id')
			setTimeout(function () {
				$(`#${id} .header`).fadeOut();
				mousenterNote = false;
			},500)
		}
	})
	$("body").on("mousedown",".note" ,function (e) {
			var cursorX = e.pageX;
	    var cursorY = e.pageY;
	    alert(cursorx)
	    alert(cursorY)
	})	
	$("body").on("click", '.checkboxDrag' ,function () {
		if($(this).is(":checked")) 
			{
				lockNoteValue($(this).attr('id'),"true")
			}
		else
			{
				lockNoteValue($(this).attr('id'),"false")
			}
	})
})
function edit(id) {
	var txt = $(`#${id} p`).html();
	$(`#${id} p`).hide();
	$(`#${id} textarea`).val(txt.split("<br>"));
	$(`#${id} textarea`).show();
	$(`#${id} .save`).show();
	$(`#${id} .edit`).hide();
	$(`#${id} .info`).show();
	$("select").hide();
	$("span").hide();
	$(".checkboxDrag").hide();
	$(".setting_note").hide();
}
function save(id) {
	var txt = $(`#${id} textarea`).val().split(",");
	$(`#${id} p`).html("")
	for (var i = 0; i < txt.length; i++) {
		$(`#${id} p`).append(txt[i]);
		if (i != txt.length-1)
			$(`#${id} p`).append("<br>");
	}
	$(`#${id} p`).show();
	$(`#${id} textarea`).hide();
	$(`#${id} .save `).hide();
	$(`#${id} .edit`).show();
	$(`#${id} .info`).hide();
	$("select").show();
	$(".setting_note").show();
	$("span").show();
	$(".checkboxDrag").show();
	let note = localStorage.getItem("note").split("|")
	var result = "";
	for (var i = 0; i < note.length-1; i++) {
		let text = note[i].split(":")
		if (text[0]==id) 
		{
			text[1] = txt ;
		}
		result = result + text[0] + ":" + text[1] + ":" + text[2] + ":" + text[3] +"|";
	}
	localStorage.setItem("note",result)	
}

function creat() {
	let note = localStorage.getItem("note").split("|")
	for (var i = 0; i < note.length-1; i++) {
		let text = note[i].split(":")
		$(`#${text[0]}`).css({
			"background-color":"red"
		})
		app(text[0],text[1].split(","));

		if (text[2] != "1")
		{
			$(`#${text[0]}`).css({
				"background-color" : text[2]
			})
			$(`#${text[0]}`).css({
				"color" : text[3]
			})
			if (text[3]==undefined && text[2]=="black")
			{
				$(`#${text[0]}`).css({
					"color" : "white"
				})
			}
		}
		var RGBcolor_bgColor = $(`#${text[0]}`).css("background-color");
		var RGBcolor_fgColor = $(`#${text[0]}`).css("color");
		select_bgcolor_selector(text[0],RGBcolor_bgColor);
		select_fgcolor_selector(text[0],RGBcolor_fgColor);
	}
	$(".note").draggable()
}
function app(id,note) {
	$("#note_Box").append(`
		<div class="note" id="${id}">
			<div class="header">
				<div class="close">
					<i class="bi bi-trash3-fill"></i>
				</div>
				<div class="edit">
					<i class="bi bi-pencil-fill"></i>
				</div>
				<div class="save">
					ذخیره
				</div>
				<div class="setting_note">
					<div class="dropdown">
					  <button class="slideUpDown btn btn-light dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" class="setting_Note_btn">
					    <i class="bi bi-gear-fill"></i>
					  </button>
					  <ul class="dropdown-menu">
					    <li>
					    	<a class="dropdown-item" href="#">
					    		<div class="change_bgColor">
					    		<span id="change_bgColor_txt">رنگ پس‌زمینه</span>
					    			<select id="${parseInt(id)+1}" class="select">
					    				<option class="select_option" value="#f28b82" style="background-color:#f28b82"><!--#f28b82-->قرمز</option>
					    				<option class="select_option" value="#fbbc04" style="background-color:#fbbc04"><!--#fbbc04-->نارنجی</option>
					    				<option class="select_option" value="#fff475" style="background-color:#fff475"><!--#fff475-->زرد</option>
					    				<option class="select_option" value="#ccff90" style="background-color:#ccff90"><!--#ccff90-->سبز</option>
					    				<option class="select_option" value="#a7ffeb" style="background-color:#a7ffeb"><!--#a7ffeb-->سبز دودی</option>
					    				<option class="select_option" value="#cbf0f8" style="background-color:#cbf0f8"><!--#cbf0f8-->آبی</option>
					    				<option class="select_option" value="#aecbfa" style="background-color:#aecbfa"><!--#aecbfa-->آبی تیره</option>
					    				<option class="select_option" value="#d7aefb" style="background-color:#d7aefb"><!--#d7aefb-->بنفش</option>
					    				<option class="select_option" value="#fdcfe8" style="background-color:#fdcfe8"><!--#fdcfe8-->صورتی</option>
					    				<option class="select_option" value="#e6c9a8" style="background-color:#e6c9a8"><!--#e6c9a8-->قهوه ای</option>
					    				<option class="select_option" value="#e8eaed" style="background-color:#e8eaed"><!--#e8eaed-->خاکستری</option>
					    			</select>
					    		</div>
					    	</a>
						</li>
					    <li>
					    	<a class="dropdown-item" href="#">
					    		<div class="change_fgColor">
					    		<span id="change_fgColor_txt">رنگ متن</span>
					    			<select id="${parseInt(id)+2}" class="select_txt">
					    				<option value="white" style="background-color:white"><!--white-->سفید</option>
					    				<option value="blue" style="background-color:blue;color:white"><!--blue-->آبی</option>
					    				<option value="cyan" style="background-color:cyan;color:white"><!--cyan-->آبی آسمانی</option>
					    				<option value="magenta" style="background-color:magenta;color:white"><!--magenta-->بنفش</option>
					    				<option value="yellow" style="background-color:yellow"><!--yellow-->زرد</option>
					    				<option value="pink" style="background-color:pink"><!--pink-->صورتی</option>
					    				<option value="lime" style="background-color:lime"><!--lime-->سبز</option>
					    				<option value="green" style="background-color:green;color:white"><!--green-->سبز لجنی</option>
					    				<option value="orange" style="background-color:orange"><!--orange-->نارنجی</option>
					    				<option value="black" style="background-color:black;color:white"><!--black-->سیاه</option>
					    			</select>
					    		</div>
					    	</a>
					    </li>
					    <li>
					    	<a class="dropdown-item" href="#">
					    		<div class="lock">
					    			<span>قفل یادداشت </span><input type="checkbox" name="" id="${parseInt(id)+3}" class="checkboxDrag">
					    		</div>
					    	</a>
					    </li>
					  </ul>
					</div>
				</div>
			</div>
			<p id="${id}" class="txt"></p>
			<textarea name="" class="edit_note" cols="20" rows="10"></textarea>
		</div>
	`);
	for (var i = 0; i < note.length; i++) {
		$(`#${id} p`).append(note[i]);
		if (i != note.length-1)
			$(`#${id} p`).append("<br>");
	}
}
function bgRandomColor(id) {
	var color = "yellow";
	var rand_color = rand(0,10);
	if (rand_color==0)
	{
		$(`#${id}`).css({
			"background-color" : "#f28b82"
		})
		color = "#f28b82";
	}
	if (rand_color==1)
	{
		$(`#${id}`).css({
			"background-color" : "#fbbc04"
		})
		color = "#fbbc04";
	}
	if (rand_color==2)
	{
		$(`#${id}`).css({
			"background-color" : "#fff475"
		})
		color = "#fff475";
	}
	if (rand_color==3)
	{
		$(`#${id}`).css({
			"background-color" : "#ccff90"
		})
		color = "#ccff90";
	}
	if (rand_color==4)
	{
		$(`#${id}`).css({
			"background-color" : "#a7ffeb"
		})
		color = "#a7ffeb";
	}
	if (rand_color==5)
	{
		$(`#${id}`).css({
			"background-color" : "#cbf0f8"
		})
		color = "#cbf0f8";
	}
	if (rand_color==6)
	{
		$(`#${id}`).css({
			"background-color" : "#aecbfa"
		})
		color = "#aecbfa";
	}
	if (rand_color==7)
	{
		$(`#${id}`).css({
			"background-color" : "#d7aefb"
		})
		color = "#d7aefb";
	}
	if (rand_color==8)
	{
		$(`#${id}`).css({
			"background-color" : "#fdcfe8"
		})
		color = "#fdcfe8";
	}
	if (rand_color==9)
	{
		$(`#${id}`).css({
			"background-color" : "#e8eaed"
		})
		color = "#e8eaed";
	}
	let note = localStorage.getItem("note").split("|")
	var result = "";
	for (var i = 0; i < note.length-1; i++) {
		let text = note[i].split(":")
		if (text[0]==id) 
		{
			text[2] = color;
		}
		result = result + text[0] + ":" + text[1]  + ":" +  text[2] + "|";
	}
	localStorage.setItem("note",result)
}

function add() {
	var note = $("#note").val().split("\n");
	var id = new Date();
	id = id.getTime();
	localStorage.setItem("note",localStorage.getItem("note")+id+":"+note+"|");
	app(id,note)
	bgRandomColor(id);
	$(".note").draggable()
	var RGBcolor_bgColor = $(`#${id}`).css("background-color");
	var RGBcolor_fgColor = $(`#${id}`).css("color");
	select_bgcolor_selector(id,RGBcolor_bgColor);
	select_fgcolor_selector(id,RGBcolor_fgColor);
}

function close(id) {
	let note = localStorage.getItem("note").split("|")
	var result = "";
	for (var i = 0; i < note.length; i++) {
		let text = note[i].split(":")
		if (text[0]!=id) {
			result = result + note[i] + "|";
		}
	}
	$(`#${id}`).hide();
	result = result.substr(0,result.length-1)
	localStorage.setItem("note",result)
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function change_bgColor(color,id) {
	$(`#${id}`).css({
		"background-color" : color
	})
	let note = localStorage.getItem("note").split("|")
	var result = "";
	for (var i = 0; i < note.length-1; i++) {
		let text = note[i].split(":")
		if (text[0]==id) 
		{
			text[2] = color;
		}
		result = result + text[0] + ":" + text[1]  + ":" +  text[2] + ":" +  text[3] + "|";
	}
	localStorage.setItem("note",result)
}
function change_fgColor(color,id) {
	$(`#${id}`).css({
		"color" : color
	})

	let note = localStorage.getItem("note").split("|")
	var result = "";
	for (var i = 0; i < note.length-1; i++) {
		let text = note[i].split(":")
		if (text[0]==id) 
		{
			text[3] = color;
		}
		result = result + text[0] + ":" + text[1]  + ":" +  text[2] +  ":" +  text[3] + "|";
	}
	localStorage.setItem("note",result)
}

function select_bgcolor_selector(id,RGBcolor) {
	if(RGBcolor=="rgb(242, 139, 130)")
		$(`#${id} select[class="select"] option[value="#f28b82"]`).attr("selected",true);
	else if(RGBcolor=="rgb(251, 188, 4)")
		$(`#${id} select[class="select"] option[value="#fbbc04"]`).attr("selected",true);
	else if(RGBcolor=="rgb(255, 244, 117)")
		$(`#${id} select[class="select"] option[value="#fff475"]`).attr("selected",true);
	else if(RGBcolor=="rgb(204, 255, 144)")
		$(`#${id} select[class="select"] option[value="#ccff90"]`).attr("selected",true);
	else if(RGBcolor=="rgb(167, 255, 235)")
		$(`#${id} select[class="select"] option[value="#a7ffeb"]`).attr("selected",true);
	else if(RGBcolor=="rgb(203, 240, 248)")
		$(`#${id} select[class="select"] option[value="#cbf0f8"]`).attr("selected",true);
	else if(RGBcolor=="rgb(174, 203, 250)")
		$(`#${id} select[class="select"] option[value="#aecbfa"]`).attr("selected",true);
	else if(RGBcolor=="rgb(215, 174, 251)")
		$(`#${id} select[class="select"] option[value="#d7aefb"]`).attr("selected",true);
	else if(RGBcolor=="rgb(253, 207, 232)")
		$(`#${id} select[class="select"] option[value="#fdcfe8"]`).attr("selected",true);
	else if(RGBcolor=="rgb(230, 201, 168)")
		$(`#${id} select[class="select"] option[value="#e6c9a8"]`).attr("selected",true);
	else if(RGBcolor=="rgb(232, 234, 237)")
		$(`#${id} select[class="select"] option[value="#e8eaed"]`).attr("selected",true);
}

function select_fgcolor_selector(id,RGBcolor) {
	if(RGBcolor=="rgb(255, 255, 255)")
		$(`#${id} select[class="select_txt"] option[value="white"]`).attr("selected",true);
	else if(RGBcolor=="rgb(0, 0, 255)")
		$(`#${id} select[class="select_txt"] option[value="blue"]`).attr("selected",true);
	else if(RGBcolor=="rgb(0, 255, 255)")
		$(`#${id} select[class="select_txt"] option[value="cyan"]`).attr("selected",true);
	else if(RGBcolor=="rgb(255, 0, 255)")
		$(`#${id} select[class="select_txt"] option[value="magenta"]`).attr("selected",true);
	else if(RGBcolor=="rgb(255, 255, 0)")
		$(`#${id} select[class="select_txt"] option[value="yellow"]`).attr("selected",true);
	else if(RGBcolor=="rgb(255, 192, 203)")
		$(`#${id} select[class="select_txt"] option[value="pink"]`).attr("selected",true);
	else if(RGBcolor=="rgb(0, 255, 0)")
		$(`#${id} select[class="select_txt"] option[value="lime"]`).attr("selected",true);
	else if(RGBcolor=="rgb(0, 128, 0)")
		$(`#${id} select[class="select_txt"] option[value="green"]`).attr("selected",true);
	else if(RGBcolor=="rgb(255, 165, 0)")
		$(`#${id} select[class="select_txt"] option[value="orange"]`).attr("selected",true);
	else if(RGBcolor=="rgb(0, 0, 0)")
		$(`#${id} select[class="select_txt"] option[value="black"]`).attr("selected",true);
}
function lockNoteValue(id,lock) {
	var result = 0;
	var look = localStorage.getItem("lock").split("|")
	for (var i = 0; i < look.length; i++) 
	{
		var txtlook = look[i].split(":");
		if (id==txtlook[0])
		{
			txtlook[1]=lock;
			result += "|"+txtlook[0]+":"+txtlook[1];
		}
		
	}
	result = result.substr(1,result.length)
	localStorage.setItem("lock",result)
	alert(result)
}