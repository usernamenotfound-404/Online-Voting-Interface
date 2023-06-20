var candidates=[1,2,3]
var votes=[]

var voted=false;

var state=null;

function createVoteList(candidates,votes){
    for(i=0;i<candidates.length;i++){
        votes[i]=0;
    }
}
createVoteList(candidates,votes);

function updateVoteCount(candidate, count) {
    const voteCountElement = document.getElementById(`candidate1-votes`);

    if (voteCountElement!=null && voteCountElement!=undefined) {
        voteCountElement.innerText = votes[1];
    }
}

function vote(){
    for(var i=1;i<(candidates.length+1);i++){
        if((document.getElementById(`candidate${i}`).checked)==true){
            votes[i-1]+=1;
        }

        const voteCountElement = document.getElementById(`candidate${i}-votes`);
        if (voteCountElement!=null && voteCountElement!=undefined) {
            voteCountElement.innerText = votes[i-1];
        }

    }
    console.log(votes)
}