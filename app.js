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
    const voteCountElement = document.getElementById(`${candidate}-votes`);
    if (voteCountElement) {
        voteCountElement.innerText = count;
    }
}

function vote(){
    for(var i=1;i<(candidates.length+1);i++){
        //console.log(i)
        if((document.getElementById(`candidate${i}`).checked)==true){
            console.log(candidates[i-1])
            votes[i-1]+=1;
        }
    }
    console.log(votes)
}