/*

Copyright [2023] [Anuj Doddakaragi, Tejas Muttayanmath, Akhilesh Wade]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


*/

var candidates=[
    [1,2,3,4],
    [1,2,3,4],
    [0,1,2,3,4],[1,2],
    [1,2,3,4],[1,2,3,4],
    [1,2,3],[1,2,3,4],
    [1,2,3],[1,2,3,4],
    [1,2,3,4],[1,2],
    [1,2],[1,2],

];
var votes=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

var startno=[
    1,1,1,5,1,5,1,5,1,5,1,5,1,5
];

var voted=[];

var state=null;

function createVoteList(candidates,index,votes){
    for(i=0;i<candidates.length;i++){
        votes[i]=[];
        for(j=0;j<candidates[index].length;j++){
            votes[i][j]=0;
            voted[i]=false;
        }
    }
}
votes=[]

function createVoteArray(){
    for(i=0;i<candidates.length;i++){
        temparr=[];
        for(j=0;j<candidates[i].length;j++){
            temparr.push(0);
        }
        votes.push(temparr);
    }
    votes[2]=[0,0,0,0,0]
}

createVoteArray();

function createPersistentCookie(cookieName, arrayData, expirationDays) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    var serializedData = JSON.stringify(arrayData);
  
    document.cookie = cookieName + "=" + encodeURIComponent(serializedData) + "; expires=" + expirationDate.toUTCString();
}


function getCookieData(cookieName) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
  
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      
      if (cookie.indexOf(cookieName + "=") === 0) {
        var cookieValue = cookie.slice(cookieName.length + 1);
        return JSON.parse(cookieValue);
      }
    }
  
    return null;
  }

function syncVotes(action){

    if(!document.cookie){
        createPersistentCookie("CrispBiscuit", votes, 69);
        createPersistentCookie("BakedWafers", voted, 69);
    }

    for(index=0;index<candidates.length;index++){
        for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
            updateVoteCount(index,i);
        }
    }

    if(action=="down"){
        var cd=getCookieData("CrispBiscuit");
        var cd2=getCookieData("BakedWafers");
        votes=cd;
        voted=cd2;
        
    }
    if(action=="up"){
        createPersistentCookie("CrispBiscuit", votes, 69);
        createPersistentCookie("BakedWafers", voted, 69);
        
    }

}

function updateVoteCount(index){
    

    for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
        console.log("Details - i=> ", " index=> ", index, i );
        var voteCountElement = document.getElementById(`candidate${i}-votes`);

        if (voteCountElement!=null && voteCountElement!=undefined) {
                console.log(index);
                if(index<=1){
                    voteCountElement.innerText = votes[index][i-1];
                }
                if(index>=2){

                    voteCountElement = document.getElementById(`candidate${i}-votes`);
                    voteCountElement.innerText = votes[index][i-candidates[index][0]];
                }
        }
    }
            
}

function resetVotes(){
    votes=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    voted=[];
    createVoteList(candidates,0,votes);
    createVoteList(candidates,1,votes);
    createVoteList(candidates,2,votes);
    createVoteList(candidates,3,votes);
    createVoteList(candidates,4,votes);
    createVoteList(candidates,5,votes);
    createVoteList(candidates,6,votes);
    createVoteList(candidates,7,votes);
    createVoteList(candidates,8,votes);
    createVoteList(candidates,9,votes);
    createVoteList(candidates,10,votes);
    createVoteList(candidates,11,votes);
    createVoteList(candidates,12,votes);
    createVoteList(candidates,13,votes);

    createPersistentCookie("CrispBiscuit", votes, 69);
    createPersistentCookie("BakedWafers", voted, 69);

    location.reload();

}

function resetVoted(){
    voted=[false,false,false,false,false,false,false,false,false,false,false,false,false,false];
     createPersistentCookie("BakedWafers", voted, 69);

    location.reload();
}

function vote(index){
    syncVotes("down");
        for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
            //console.log("BP0");
            var thestr=toString(i+(startno[index]-1))
            console.log("Latest ", thestr, ' ', i, ' ', startno[index],' ', i+(startno[index]-1))
            if((document.getElementById("candidate"+`${i+(startno[index]-1)}`).checked)==true){
                votes[index][i-1]+=1;

                document.getElementById('success-message').innerText = `Voted for candidate ${i} successfully!`;
                document.getElementById('error-message').innerText = '';
                
                syncVotes("up");
            }

            voted[index]==false;
            //updateVoteCount(index,i);

        }
        
    for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
            console.log("Details - i=> ", " index=> ", index, i );
            updateVoteCount(index,i);
    }
    console.log(votes)
}

function voteSC(){
    syncVotes("down");
    for(var i=0;i<5;i++){
        if((document.getElementById(`candidate${i}`).checked)==true){
            votes[2][i]+=1;

            document.getElementById('success-message').innerText = `Voted for candidate ${i} successfully!`;
            document.getElementById('error-message').innerText = '';

            syncVotes("up");
            //syncVotes("down");
        }
        var voteCountElement = document.getElementById(`candidate${i}-votes`);
        voteCountElement.innerText=votes[2][i];

    }
    syncVotes("up");
}

function updateVoteSC(){
    syncVotes("down");
    for(var i=0;i<5;i++){
        var voteCountElement = document.getElementById(`candidate${i}-votes`);
        voteCountElement.innerText=votes[2][i];

    }
    updateVoteCount(3);
}

function toggleText() {
    var hiddenText = document.getElementById("hidden-text");
    if (hiddenText.style.display === "none") {
      hiddenText.style.display = "block";
    } else {
      hiddenText.style.display = "none";
    }
  }

function saveVotes() {
    syncVotes('down');
    var votesJson = JSON.stringify(votes);
    var blob = new Blob([votesJson], { type: "application/json" });
    saveAs(blob, "votes.json");
}

function updateVC(){
    for(i=0;i<14;i++){
        for(j=0;j<candidates[i].length;j++){
            if(i<10){
                document.getElementById('v0'+`${i}`+`${j}`).innerText=votes[i][j];
            }
            else if(i>9){
                document.getElementById('v'+`${i}`+`${j}`).innerText=votes[i][j];
            }
        }
    }
}

function saveCookie(){
     // Read the cookie value
     var votesCookie = getCookie('CrispBiscuit');
    
     // Create a Blob with the cookie data
     var blob = new Blob([votesCookie], { type: 'text/plain' });
     
     // Create a URL for the Blob
     var url = URL.createObjectURL(blob);
     
     // Create a link element and trigger the download
     var a = document.createElement('a');
     a.href = url;
     a.download = 'votes.txt';
     a.click();
     
     // Release the URL object
     URL.revokeObjectURL(url);

}

function createTxtFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function exportCookieAsTxt() {
    const cookieName = 'CrispBiscuit';
    const cookieValue = encodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + cookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"));
    
    if (cookieValue) {
        const txtContent = `Cookie Name: ${cookieName}\nCookie Value: ${cookieValue}`;
        createTxtFile(txtContent, 'cookie_export.txt');
    } else {
        console.log('Cookie not found');
    }
}

function saveCookieAsTextFile(cookieName) {
    const cookieValue = decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1'));
  
    if (cookieValue) {
      const blob = new Blob([cookieValue], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${cookieName}.txt`;
  
      document.body.appendChild(a);
      a.click();
  
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error(`Cookie "${cookieName}" not found or has no value.`);
    }
  }

function saveCookieTxt(){
    var arr=[]
    var cd=getCookieData("CrispBiscuit");
    arr=cd;
    console.log(arr);
    console.log(cd);
    console.log(getCookieData('CrispBiscuit'));

    saveCookieAsTextFile("CrispBiscuit");
}
  

//Ignore

function getCookieData2(cookieName) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie[0] === cookieName) {
        var decodedData = decodeURIComponent(cookie[1]);
        var arrayData = JSON.parse(decodedData);
        return arrayData;
      }
    }
    return arrayData;

}
