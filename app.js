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
    [1,2,3,4],[5,6,7,8],
    [1,2,3,4],[5,6,7,8],
    [1,2,3,4],[5,6,7,8],
    [1,2,3,4],[5,6,7,8],
    [1,2,3,4],[5,6,7,8],
    [1,2,3,4],[5,6,7,8],

];
var votes=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

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
                else if(index>=2){
                    if(i<=4){
                        voteCountElement.innerText = votes[index][i-1];
                        if(index>=2){
                            var voteCountElement = document.getElementById(`candidate${i+4}-votes`);
                            if (voteCountElement!=null && voteCountElement!=undefined){
                                voteCountElement.innerText = votes[index+1][i-1];
                            }
                        }
                    }
                    else if(i>=5){
                        voteCountElement.innerText = votes[index][i-5];
                        var voteCountElement = document.getElementById(`candidate${i-4}-votes`);
                        voteCountElement.innerText = votes[index-1][i-5];
                    }
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
    if(voted[index]==false){
        for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
            //console.log("BP0");
            if((document.getElementById(`candidate${i}`).checked)==true){
                if(i<=4){
                    votes[index][i-1]+=1;
                }
                else if(i>=5){
                    votes[index][i-5]+=1;
                }

                document.getElementById('success-message').innerText = `Voted for candidate ${i} successfully!`;
                document.getElementById('error-message').innerText = '';

                voted[index]=true;

                syncVotes("up");
            }

            //updateVoteCount(index,i);

        }
        
    }
    else{
        //alert("You've already voted!");
        document.getElementById('error-message').innerText = 'You have already voted!';
        document.getElementById('success-message').innerText = '';
        /*for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
            //updateVoteCount(index,i);
        }*/
    }
    for(var i=(candidates[index][0]);i<=(candidates[index][candidates[index].length-1]);i++){
            console.log("Details - i=> ", " index=> ", index, i );
            updateVoteCount(index,i);
    }
    console.log(votes)
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
    var votesJson = JSON.stringify(votes);
    var blob = new Blob([votesJson], { type: "application/json" });
    saveAs(blob, "votes.json");
}

/*function getCookieData(cookieName) {
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
}*/