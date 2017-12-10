var cells= 15;
var rows= cells/4;
var extra= cells%4;
var table='';
var k=0;
table += '<table>';
for(var i=0; i<Math.floor(rows); i++)
{
	table += '<tr>';
	for(var j=0; j<4; j++)
	{
		k+=1;
		var background='image'+k;
		table+='<th alt="logo not found" background="images/'+background+'.jpg">';

		table+='</th>';
		// table+='<th><img alt="Logo not found" src="'+background+'.jpg"></th>'
	}
	table+='</tr>';

}
table+='</table>';
if(extra==1)
{
	k+=1;
	var background='image'+k;
	table+='<div id="tablelast"><div id="one"><img alt="Logo not found" src="images/'+background+'.jpg"></div></div>';
}
else if(extra==2)
{
	k+=1;
	var background1='image'+k;
	k+=1;
	var background2='image'+k;
	table+='<div id="tablelast"><div id="two"><div class="twocell" id="two1"><img alt="Logo not found" src="images/'+background1+'.jpg"></div><div class="twocell" id="two2"><img alt="Logo not found" src="images/'+background2+'.jpg"></div></div></div>';
}
else if(extra==3)
{
	k+=1;
	var background1='image'+k;
	k+=1;
	var background2='image'+k;
	k+=1;
	var background3='image'+k;
	table+='<div id="tablelast"><div id="three"><div class="threecell" id="three1"><img alt="Logo not found" src="images/'+background1+'.jpg"></div><div class="threecell" id="three2"><img alt="Logo not found" src="images/'+background2+'.jpg"></div><div class="threecell" id="three3"><img alt="Logo not found" src="images/'+background3+'.jpg"></div></div></div>';
}

document.write(table);
