function numberWithCommas(x) {
    return (x=x+'').replace(new RegExp('\\B(?=(\\d{3})+'+(~x.indexOf('.')?'\\.':'$')+')','g'),',');
}

export default numberWithCommas