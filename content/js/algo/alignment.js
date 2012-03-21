var s1,s2;	//string1, string2
var sa1=[];
var sa2=[]; // string array 1, string array 2

var len_s1 = 0;
var len_s2 =0;

var table = new Array();

var max_len;	  
var best = new Array();	

var tags = new Array();
var tags1 = new Array();
var val_map = new Array();
var dummy_map = new Array();

//var string1 = "/html/body[@id='home']/div[@id='shell']/div[@class='tabContent active' and @id='page']/div[@id='main']/div[@class='baseLayout wrap' and position()=1]/div[@class='column last' and position()=2]/div[@class='spanAB']/div[@class='abColumn' and position()=1]/div[@class='wideB noBackground opening module' and @id='ledePackageRegion']/div[@class='bColumn' and position()=3]/div[@id='bLedePackageRegion']/div[@class='columnGroup first' and position()=1]/div[@class='story' and position()=2]/h5/a";
//var string2 ="/html/body[@id='home']/div[@id='shell']/div[@class='tabContent active' and @id='page']/div[@id='main']/div[@class='baseLayout wrap layout' and position()=1]/div[@class='column last' and position()=2]/div[@class='spanAB layout']/div[@class='abColumn column' and position()=1]/div[@class='wideB module layout' and position()=4]/div[@class='bColumn opening column' and position()=2]/div[@class='columnGroup first' and position()=1]/div[@class='story' and position()=2]/h5/a";

function main()
{
	alignment_reset();
	//var result = do_alignment(string1,string2); 
	alert("length is  " +sa2.length);
	alert("Best " +best['X']);
	alert("result " + result);
}


function alignment_reset()
{

	s1=0;
	s2=0;	//string1, string2
	sa1=[];
	sa2=[]; // string array 1, string array 2

	len_s1 = 0;
	len_s2 =0;

	table = [];

	max_len=0;
	best = [];

	tags = [];
	tags1 = [];
	val_map = [];
	dummy_map = [];
	
}

function do_alignment(val1, val2)
{
	s1 = val1;
	s2 = val2;
	
   give_string_pair(s1,s2);
    calculate_matrix();
    return get_align_result();
    //return get_align_result();
	
}

function give_string_pair(val1, val2)
{
	s1=val1;
	s2=val2;
	
    sa1 = s1.split("/"); 
    sa2 = s2.split("/");
    
    sa1.shift();
    sa2.shift();      
    
    var temp_array = [];
    if(sa2.length > sa1.length)
    {
		temp_array = sa2;
		sa2 = sa1;
		sa1 = temp_array;
	}
    
	table = [];
	best = [];
	
	//initiliase table - create 2D array
	
	for(var i=0;i<=sa1.length;i++)
	{
		for(var j=0;j<=sa2.length;j++)
		{
			table[i] = new Array(j+1);
		}
	}
    
    best["MAX"] = 0;
    table[0][0] = 0;
    
    len_s1 =0;
    len_s2 = 0;
    
    tags = [];
    tags1 = [];
    val_map = [];
    dummy_map = [];
    
    for(var i=0;i<=sa1.length;i++)
    {
		tags[i] = new Array(6);
	}

	
    for(var i=0;i<=sa2.length;i++)
    {
		tags1[i] = new Array(6);
	}	
	
	get_details(sa1,tags);
	get_details(sa2,tags1);
}

function get_details(arr1,arr2)
{
	
	for(var i=0;i<arr1.length;i++)
	{
		var tag_to_replace = arr1[i];
		var tag = arr1[i];
		
		tag_to_replace = tag.replace(/\[.*\]/,"");
		
		arr2[i]['tag'] = tag_to_replace;
		arr2[i]['num'] = '';
		arr2[i]['pos'] = '';
		arr2[i]['class'] = '';
		arr2[i]['id'] = '';		
			
		if(tag.search(/\[/)!=-1)
		{
			var par = tag;
			par = par.replace(/.*?\[([^\]]*)\].*/,"$1");
			//alert(par);
			if(par.search(/^\d/)!=-1)
			{
				arr2[i]['num']=par;
				
			}
			if(par.search(/\@id/)!=-1)
			{
				var id_val = par;
				id_val = id_val.replace(/.*\@id='([^']*)'.*/,"$1");
				arr2[i]['id'] = id_val;
			}
			
			if(par.search(/\@class/)!=-1)
			{
				var class_val = par;
				class_val = class_val.replace(/.*\@class='([^']*)'.*/,"$1");
				arr2[i]['class'] = class_val;
			}
			
			if(par.search(/position/)!=-1)
			{
				var pos_val = par;
				pos_val = pos_val.replace(/.*position\(\)=(\d+).*/,"$1");
				arr2[i]['pos'] = pos_val;
			}				


		}
				
		arr1[i] = tag_to_replace;
		
	}	
	
}

function calculate_matrix()
{
	max_len = 0;
    
    for(len_s1=0;len_s1<=sa1.length;len_s1++)
    {
		for(len_s2=0;len_s2<=sa2.length;len_s2++)
		{
			var candidate1 = max_len;
			var candidate2 = max_len;
			var candidate3 = max_len;
			
			if (len_s1 > 0 && len_s2 > 0) 
			{
				
				var match_val = 0;
				
				if((sa1[len_s1-1] == '-')||(sa2[len_s2-1] == '-'))
				{
					match_val = 1;
					//alert(sa1[len_s1-1]);
				}
				else if(sa1[len_s1-1] == sa2[len_s2-1])
				{
					match_val=1;
					//alert(sa1[len_s1-1]);
				}
				else
				{
					match_val = -1;
				}
				candidate1 = parseInt(table[len_s1-1][len_s2-1]) + match_val;
			}
			
			if (len_s1 > 0) 
			{
				candidate2 = parseInt(table[len_s1-1][len_s2]) - 1;
			}
			
			if (len_s2 > 0) 
			{
				candidate3 = parseInt(table[len_s1][len_s2 - 1]) - 1;
			}

			if (len_s1 > 0 || len_s2 > 0)
			{
				table[len_s1][len_s2] = Math.max(candidate1, candidate2, candidate3, 0) 
			}
			
			if(best['MAX'] <= table[len_s1][len_s2])
			{
				best['X'] = len_s1;
				best['Y'] = len_s2;
				best['MAX'] = table[len_s1][len_s2];
			}
			
			
		}
    }	
	
}

function get_align_result()
{
	var i,j;
	var as1 = [];
	var as2 = [];
	var baseline=0;
   
	i = best['X'];
	j = best['Y'];
	
	var ct=0;
	//var sa2_size = sa1.length;
	
    while ( table[i][j] > 0)
    {
	    baseline = Math.max(table[i-1][j-1],table[i-1][j],table[i][j-1]);
		
		if(table[i-1][j-1] == baseline) 
		{
			as1.push(sa1[i-1]);
			as2.push(sa2[j-1]);
			dummy_map[ct]=j-1;
			i--;
			j--;
		} 
		else if (table[i][j-1] == baseline) 
		{
			as1.push("-");
			as2.push(sa2[j-1]);
			dummy_map[ct]=j-1;
			
			j--;
		} 
		else if (table[i-1][j] == baseline) 
		{
			as1.push(sa1[i-1]);
			as2.push("-");
			//val_map[(sa2_size - ct - 2)]=j-1;
			
			i--;
		} 
		else 
		{
			alert('hmm. something wrong');
		}
		
		ct++;		
	}
	
	//load data from dummy map to val_map
	
	for(var k=0;k<dummy_map.length;k++)
	{
		val_map[as2.length - k - 1] = dummy_map[k];
	}
	
	as2.reverse();
	as1.reverse();
    
    ct=0;
    var ans="";
    var cur_tag="";
    var prev_tag="";
    
    for(var k=0;k<as2.length;k++)
    {
		var val = as2[k];
		cur_tag = val;
		if(val != '-')
		{
			if(prev_tag == '-')
			{
				ans+="/";
			}			
			ans+="/"+val;
			
			
			var bool = 0;
			var attrib=  "";
			if(val_map[ct]!=null)
			{
			if((tags1[val_map[ct]]['id'] == tags[ct]['id']) && tags1[val_map[ct]]['id'] != '' &&tags[ct]['id'] != '')
			{
				bool=1;
				attrib+="\@id='"+tags1[val_map[ct]]['id']+"'";
			}				
			
			if((tags1[val_map[ct]]['class'] == tags[ct]['class']) && tags1[val_map[ct]]['class'] != '' &&tags[ct]['class'] != '')
			{
				if(bool == 1)
				{
					attrib+=" and ";
				}
				else
				{
					bool = 1;
				}
				attrib+="\@class='"+tags1[val_map[ct]]['class']+"'";
			}
			
			if((tags1[val_map[ct]]['pos'] == tags[ct]['pos']) && tags1[val_map[ct]]['pos'] != '' &&tags[ct]['pos'] != '')
			{
				if(bool == 1)
				{
					attrib+=" and ";
				}
				else
				{
					bool = 1;
				}
				attrib+="position()="+tags1[val_map[ct]]['pos'];
			}		
		
		}
		else
		{
			alert('error');
		}
		
			if(bool == 1)
			{
				ans+="["+attrib+"]";
			}

		}
		
		prev_tag = cur_tag;
		ct++;
	}
	
	return ans;	
	
	//Insert code
}
