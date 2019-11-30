document.addEventListener('DOMContentLoaded', function(){

    let form = document.querySelector('form');
    let newPetName = document.querySelector('input[name="new-petname"]');
    let newPetOwner = document.querySelector('input[name="new-petowner"]');
    let newDate = document.querySelector('input[name="new-apt-date"]');
    let newTime = document.querySelector('input[name="new-apt-time"]');
    let newNote = document.querySelector('textarea[name="new-apt-notes"]');
    let aptList = document.querySelector('.apt-list');
    let select = document.querySelector('select[name="sort-by"]');
    let search = document.querySelector('input[name="search-text"]');
    
    
    let userDataArr = [];
    let searchResults = userDataArr.slice();

    function UserData (petName, date, time, petOwner, note) {
        this.petName = petName;
        this.date = date;
        this.time = time;
        this.petOwner = petOwner;
        this.note = note;
    }

    function validateField (field) {
        if (!field.value) {
            field.classList.add('validation-error');
            return false;
        } else {
            field.classList.remove('validation-error');
            return true;
        }
    }

    function createApt (e) {
        e.preventDefault();
        let validPetName = validateField(newPetName);
        let validDate = validateField(newDate);
        let validTime = validateField(newTime);
        let validPetOwner = validateField(newPetOwner);
        let validNote = validateField(newNote);

        if (validPetName == true && validDate == true && validTime == true && validPetOwner == true && validNote == true) {
            let userData = new UserData(newPetName.value, newDate.value, newTime.value, newPetOwner.value, newNote.value);  
            userDataArr.push(userData);
            searchResults.push(userData);
            updateMarkup(userDataArr);
            newPetName.value = '';
            newPetOwner.value = '';
            newDate.value = '';
            newTime.value = '';
            newNote.value = '';
        }
    }

    function updateMarkup (tempArr) {
        aptList.innerHTML = '';
        for (let i = 0; i < tempArr.length; i++) {
            let tempApt = createSingleAptMarkup(tempArr[i], i);
            aptList.append(tempApt);
        }
    }

    function createSingleAptMarkup (userObj, index) {
        let aptListItem = document.createElement('div');
        aptListItem.classList.add("apt-list-item");

        let aptDeleteIcon = document.createElement('img');
        aptDeleteIcon.setAttribute('src', 'assets/cancel.svg');
        aptDeleteIcon.classList.add("delete-icon");
        aptListItem.append(aptDeleteIcon);
        function deleteApt () {
            userDataArr.splice(index, 1);
            updateMarkup(userDataArr);
        }
        aptDeleteIcon.addEventListener('click', deleteApt);

        let aptDetails = document.createElement('div');
        aptDetails.classList.add("apt-details");
        aptListItem.append(aptDetails);
        
        let aptPetName = document.createElement('div');
        aptPetName.classList.add("petname");
        aptPetName.textContent = userObj.petName;
        aptDetails.append(aptPetName);

        let aptDate = document.createElement('div');
        aptDate.classList.add("date");
        aptDate.textContent = userObj.date;
        aptDetails.append(aptDate);

        let aptTime = document.createElement('div');
        aptTime.classList.add("time");
        aptTime.textContent = userObj.time;
        aptDetails.append(aptTime);

        let aptPetOwner = document.createElement('div');
        aptPetOwner.classList.add("owner");
        aptPetOwner.textContent = `Owner: ${userObj.petOwner}`;
        aptDetails.append(aptPetOwner);

        let aptNote = document.createElement('div');
        aptNote.classList.add("note");
        aptNote.textContent = userObj.note;
        aptDetails.append(aptNote);

        return aptListItem;
    }

    form.addEventListener('submit', createApt);

    function sortOptions () {
        let currentOption = select[select.selectedIndex].value;
        function sortObjects (a, b) {
            if (a[currentOption] > b[currentOption]) return 1;
            else return -1;
        }

        searchResults.sort(sortObjects);
        updateMarkup(searchResults);
    }

    select.addEventListener('change', sortOptions);

    function searchOptions () {
        let searchText = this.value.toLowerCase();
        searchResults = userDataArr.filter(function(item){
            for (let key in item) {
                if (item[key].toLowerCase().indexOf(searchText) != -1) return true;
            }
        })
        updateMarkup(searchResults);
    }

    search.addEventListener('keyup', searchOptions);

    /* function searchOptions () {
        let searchText = search.value.toLowerCase();
        let listItems = document.querySelectorAll('.apt-list-item');
        for (let i = 0; i < userDataArr.length; i++) {
            let petName = userDataArr[i].petName.toLowerCase();
            let petOwner = userDataArr[i].petOwner.toLowerCase();
            let date = userDataArr[i].date.toLowerCase();
            let time = userDataArr[i].time.toLowerCase();
            let note = userDataArr[i].note.toLowerCase();

            if (petName.includes(searchText) || 
                petOwner.includes(searchText) ||
                date.includes(searchText) ||
                time.includes(searchText) ||
                note.includes(searchText)) {
                listItems[i].style.display = '';
            } else {
                listItems[i].style.display = 'none';
            };
        }
    } */

})