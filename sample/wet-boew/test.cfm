<script>

function validateZoneDef(value,type)
   { 
    var type = type || 'bb'; //boundingBox
    
    switch(type) {
    case 'bb':
        var patt = new RegExp("^\s*?\[\s*?(((-?\d+\.\d+\s*?,?\s*?-?\d+\.\d+)\s*?,?\s*?)+)\s?\]");
        break;
}
        return patt.test(value);
}
console.log(validateZoneDef([-180.0, -90.0, 180.0, 90.0]));
</script>
