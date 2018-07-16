var currentAlgorithm = 0;
var algorithmDic = {
	0 : "冒泡排序算法",
	1 : "快速排序算法",
	2 : "归并排序算法",
	3 : "插入排序算法",
	4 : "上帝排序算法"
}
function GetRandomNumber(l,r){
	return Math.floor(Math.random()*(r-l) + l);
}
function GenerateNumbers(n,l,r){
	var A = [];
	for(var i=0;i<n;i++){
		A[i] = GetRandomNumber(l,r);
	}
	
	return A;
}
function GetArrayFromUnorderList(){
	var unorderList = document.getElementById("unorder-list");
	var lis = unorderList.getElementsByTagName('li');
	var A = [];
	for(var i=0;i<lis.length;i++){
		A[i] = parseInt(lis[i].textContent);
	}
	return A;
}

function SortArray(A,sortAlgorithmId){
	//冒泡排序
	if(sortAlgorithmId === -1){
		alert("你还没有选择用什么算法进行排序呢，快选一下吧");
	}else
	if(sortAlgorithmId === 0){
		BubbleSort(A);
	}else
	if(sortAlgorithmId === 1){
		try {
    		QuickSort(A);
 		} catch (e) {
 			alert("不好意思，您所使用的快速排序算法导致程序栈溢出，现已终止。\n建议您生成的整数少一点或改用其他算法。");
 			//throw(e);
  		}
	}else
	if(sortAlgorithmId === 2){
		MergeSort(A);
	}else
	if(sortAlgorithmId === 3){
		InsertSort(A);
	}
	else{
		alert("这个算法作者还没实现哦");
	}
}

function ClearDropdownMenu(){
	document.getElementById("dropdown-menu").innerHTML = "";
}
function AddAlgorithmNameToDropdownMenu(algorithmName,v){
	var dropdownMenu = document.getElementById("dropdown-menu");
	dropdownMenu.innerHTML += "<li value='"+ v +"'>" + algorithmName + "</li>";
}
function AddClickEventListenerToDropdownMenu(clickListener){
	var lis = document.getElementById("dropdown-menu").getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		lis[i].addEventListener("click",clickListener);
		//console.log(lis[i]);
	}
}
function UpdateCurrentAlgorithm(){
	document.getElementById("dropdown-menu-a").textContent = algorithmDic[currentAlgorithm];
}

document.addEventListener("DOMContentLoaded",(
function (){
	//console.log("文档已载入!");

	//设置按钮监听事件
	document.getElementById("generate-button")
	.addEventListener("click",
		function () {
			console.log("有人按下了生成按钮");
			var n = parseInt(prompt("你要生成多少个整数呢？",100));
			if(n <= 0 || n > 1000000){
				alert("你输入的数字太小或太大，可能对你的设备产生危害，请再输入一遍吧！");
			}else{
				var l = parseInt(prompt("你希望生成的整数的最小值是多少呢？",0));
				var r = parseInt(prompt("你希望生成的整数的最大值是多少呢？",100));

				var A = GenerateNumbers(n,l,r);

				//修改文档
				var unorderList = document.getElementById("unorder-list");
				//console.log(unorderList);

				var str = "";
				for(var a in A){
					str += "<li>";
					str += A[a];
					str += "</li>";
				}

				//console.log(str);

				unorderList.innerHTML = str;
			}

		}
	);

	document.getElementById("sort-button")
	.addEventListener("click",
		function () {
			console.log("有人按下了排序按钮");

			//从未排序列表中获取数组
			var A = GetArrayFromUnorderList();
			if(A.length === 0){
				alert("列表空空如也，你还没有生成任何整数呢，快去生成吧！");
			}else{
				//排序
				var lastTime = (new Date()).getTime();
				SortArray(A,currentAlgorithm);
				var useTime = ((new Date()).getTime() - lastTime);

				//修改文档
				var orderList = document.getElementById("order-list");
				var str = "";
				for(var a in A){
					str += "<li>";
					str += A[a];
					str += "</li>";
				}
				orderList.innerHTML = str;


				alert("使用"+algorithmDic[currentAlgorithm]+"对" + A.length + "个整数进行排序，共用时:" + useTime + "ms。");

			}
		}
	);

	//给排序事件多一点选项
	ClearDropdownMenu();
	AddAlgorithmNameToDropdownMenu("冒泡排序算法",0);
	AddAlgorithmNameToDropdownMenu("快速排序算法",1);
	AddAlgorithmNameToDropdownMenu("归并排序算法",2);
	AddAlgorithmNameToDropdownMenu("插入排序算法",3);
	AddAlgorithmNameToDropdownMenu("上帝排序算法",4);

	AddClickEventListenerToDropdownMenu(function(event){
		console.log(algorithmDic[event.target.value]);
		currentAlgorithm = event.target.value;
		UpdateCurrentAlgorithm();
	}
	);


	currentAlgorithm = -1;
}
));

//========Algorithms=======
function BubbleSort(A){
	var isUpdate = true;
	while(isUpdate){
		isUpdate = false;
		for(var i=1;i<A.length;i++){
			if(A[i] < A[i-1]){
				var t = A[i];
				A[i] = A[i-1];
				A[i-1] = t;
				isUpdate = true;
			}
		}
	}
}

function InsertSort(A){
	for(var i=0;i<A.length;i++){
		for(var j=i-1;j>=0;j--){
			if(A[j]>A[j+1]){
				var t = A[j];
				A[j] = A[j+1];
				A[j+1] = t;
			}else{
				break;
			}
		}
	}
}

function MergeSort(A){
	var n = A.length;
	if(n <= 1)return;

	var B = [];
	var bn = Math.floor(n/2);
	for(var i=0;i < bn;i++){
		B[i] = A[i];
	}
	var C = [];
	for(var i=0;i < (n - bn);i++){
		C[i] = A[i+bn];
	}

	MergeSort(B);
	MergeSort(C);

	var ai=0,bi=0,ci=0;
	while(ai < n){
		if((ci >= C.length) || (bi < B.length && B[bi] < C[ci]))
			A[ai++] = B[bi++];
		else
			A[ai++] = C[ci++];
	}
}


function QuickSortPartition(A,l,r){
	var x = A[r-1];
	var i=l-1;
	for(var k=l;k < r-1;k++){
		if(A[k] < x){
			i += 1;
			var t = A[k];
			A[k] = A[i];
			A[i] = t;
		}
	}
	i += 1;
	var t = A[r-1];
	A[r-1] = A[i];
	A[i] = t;
	return i;
}
function QuickSort(A,l,r){
	l = l || 0;
	r = r || A.length;
	if(r-l > 1){
		var m = QuickSortPartition(A,l,r);

		QuickSort(A,l,m);
		QuickSort(A,m+1,r);
	}
}






