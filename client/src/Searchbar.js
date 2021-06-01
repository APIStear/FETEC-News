import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Searchbar = ({onChange}) => {
  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <SearchIcon />
      </Grid>
      <Grid item>
        <Autocomplete
          id="combo-box-demo"
          options={[]}
          freeSolo
          style={{ width: 300 }}
          renderInput={(params) => 
            <TextField {...params}  label="Buscar Evento"  InputProps={{...params.InputProps, disableUnderline:true}}/>
          }
          onInputChange={(event, inputValue) => onChange(inputValue)}
          clearOnEscape
        />
      </Grid>
    </Grid>

  );
}

export default Searchbar;