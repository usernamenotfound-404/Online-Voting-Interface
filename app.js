var candidates=[[1,2,3,4],[1,2,3,4]]
var votes=[[],[]]

var voted=false;

var state=null;

var candidateVotes = {
    "Head Boy": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "Head Girl": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "Sports Captain": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "Knights Captain": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "Spartans Captain": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "Vikings Captain": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "Samurais Captain": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    },
    "CCA Captain": {
        "Candidate 1": 0,
        "Candidate 2": 0,
        "Candidate 3": 0,
        "Candidate 4": 0
    }
};

function createVoteList(candidates,index,votes){
    for(i=0;i<candidates.length;i++){
        votes[i]=[];
        for(j=0;j<candidates[index].length;j++){
            votes[i][j]=0;
        }
    }
}
createVoteList(candidates,0,votes);
createVoteList(candidates,1,votes);

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

function saveVotes() {
    var votesJson = JSON.stringify(candidateVotes);
    var blob = new Blob([votesJson], { type: "application/json" });
    saveAs(blob, "votes.json");
}
