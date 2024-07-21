const PersonForm = ({ nameVal, numVal, onChangeName, onChangeNum, handleSubmit}) => {
    return (<form onSubmit={handleSubmit}>
        <div>
          name: <input value={nameVal} onChange={onChangeName}/>
        </div>
        <div>
          number: <input value={numVal} onChange={onChangeNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm