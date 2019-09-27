const query = `
  query {
    syntheticTokenFacilities (orderBy: timestamp, orderDirection: desc, first: 1000){
    id
    creator
    timestamp
    contractAddress
    synthetic{
      name
      symbol
      tokenBalance
    }
  }
}
`;
const url = "https://api.thegraph.com/subgraphs/name/imabdullahjan/uma-project-hackathon";
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
};
fetch(url, opts)
  .then(res => res.json())
  .then(json =>{

    let result = json.data.syntheticTokenFacilities;
    // console.log(result);
    for (var i = 0; i < result.length; i++) {
      // Get index
      let index = i+1;

      // Get transaction hash
      let txHash17Char = result[i].id.substring(0, 9).concat("...");
      // console.log(txHash17Char);
      let txHash = "<a target=\"_blank\" href=\"https:\//rinkeby.etherscan.io\/tx\/" + result[i].id + "\">"+txHash17Char+"</a>"

      // Get Date
      let date = result[i].timestamp;
      var curdate = new Date(null);
      curdate.setTime(date*1000);
      let dateResult = curdate.toLocaleString();

      // Get Synthetic Owner Address
      let owner17Char = result[i].creator.substring(0, 9).concat("...");
      // console.log(owner17Char);
      let ownerAddress = "<a target=\"_blank\" href=\"https:\//rinkeby.etherscan.io\/address\/" + result[i].creator+ "\">"+owner17Char+"</a>"

      // Get Synthetic Contract Address
      let synthetic17Char = result[i].contractAddress.substring(0, 9).concat("...");
      // console.log(owner17Char);
      let syntheticAddress = "<a target=\"_blank\" href=\"https:\//rinkeby.etherscan.io\/token\/" + result[i].contractAddress+ "\">"+synthetic17Char+"</a>"

      // Get Token Details
      let syntheticTokenDetails = result[i].synthetic
      let tokenName;
      let tokenSymbol;
      let tokenBalance;


      if (syntheticTokenDetails == null) {
        tokenName = "Synthetic token not mint yet!"
        tokenSymbol = "-"
        tokenBalance = "-"
      } else {
        tokenName = syntheticTokenDetails.name;
        tokenSymbol = syntheticTokenDetails.symbol;
        tokenBalance = syntheticTokenDetails.tokenBalance/Math.pow(10, 18);
      }
      // console.log(tokenName);

      var btn = $("<tr>" + "<td>" + index +"</td>"+ "<td>" + txHash +"</td>"+ "<td>" + dateResult +"</td>"+"<td>" + ownerAddress +"</td>"+"<td>" + syntheticAddress +"</td>" + "<td>" + tokenName +"</td>" + "<td>" + tokenSymbol +"</td>" + "<td>" + tokenBalance +"</td>" + "</tr>");
      $('#test').append(btn);
    }

    console.log(json.data.syntheticTokenFacilities.length);

  })
  .catch(console.error);
