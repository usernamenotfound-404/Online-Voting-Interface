var candidates=[[1,2,3],[1,2,3]]
var votes=[[],[]]

var voted=false;

var state=null;

var voteCount={
    'headboy':votes[0],
    'headgirl':votes[1],
    'sports_capt_boy':votes[2],
    'sports_capt_girl':votes[3],
}

function createVoteList(candidates,index,votes){
    for(i=0;i<candidates.length;i++){
        votes[i]=[];
        for(j=0;j<candidates[index].length;j++){
            votes[i][j]=0;
        }
    }
}
createVoteList(candidates,0,votes);

function vote(index){
    if(voted==false){
        for(var i=1;i<(candidates[index].length+1);i++){
            if((document.getElementById(`candidate${i}`).checked)==true){
                votes[index][i-1]+=1;
            }

            const voteCountElement = document.getElementById(`candidate${i}-votes`);
            if (voteCountElement!=null && voteCountElement!=undefined) {
                voteCountElement.innerText = votes[index][i-1];
            }

            if((document.getElementById(`candidate${i}`).checked)==true){
                voted=true;
            }

        }
        
    }
    else{
        alert("You've already voted!");
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