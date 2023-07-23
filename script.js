const commandsData = [{
  "id": "9876543210",
  "application_id": "1234567890",
  "version": "112233445566778899",
  "default_member_permissions": null,
  "type": 1,
  "name": "example2",
  "description": "This is another example of JSON data.",
  "dm_permission": true,
  "contexts": null,
  "options": [
    {
      "type": 1,
      "name": "subcommand3",
      "description": "This is the third subcommand."
    },
    {
      "type": 1,
      "name": "subcommand4",
      "description": "This is the fourth subcommand."
    },
    {
      "type": 1,
      "name": "subcommand5",
      "description": "This is the fifth subcommand."
    }
  ],
  "nsfw": true
},
{
  "id": "1234567890",
  "application_id": "9876543210",
  "version": "112233445566778899",
  "default_member_permissions": null,
  "type": 1,
  "name": "example1",
  "description": "This is an example of JSON data.",
  "dm_permission": true,
  "contexts": null,
  "options": [
    {
      "type": 1,
      "name": "subcommand1",
      "description": "This is the first subcommand."
    },
    {
      "type": 1,
      "name": "subcommand2",
      "description": "This is the second subcommand."
    }
  ],
  "nsfw": false
}
]

document.addEventListener("DOMContentLoaded", function () {
  const commandsListElement = document.getElementById("commands-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Function to generate HTML elements for subcommands
  function createSubcommandsList(subcommands, parentCommandName) {
    const subcommandsList = document.createElement("div"); // Using div instead of ul to contain the subcommands
    subcommandsList.classList.add("subcommands-list");
    subcommandsList.style.display = "none";


    subcommands.forEach((subcommand) => {
      const subcommandElement = document.createElement("div");
      subcommandElement.classList.add("subcommand"); // Class for each subcommand div

      const subcommandName = document.createElement("h3");
      subcommandName.textContent = `/${parentCommandName} ${subcommand.name}`; // Notation to display the subcommand name
      subcommandElement.appendChild(subcommandName);

      const subcommandDescription = document.createElement("p");
      subcommandDescription.textContent = subcommand.description;
      subcommandElement.appendChild(subcommandDescription);

      subcommandsList.appendChild(subcommandElement);
    });

    return subcommandsList;
  }

  // Function to generate HTML elements for commands
  function createCommandElement(command) {
    if (!command.description) {
      return null; // If the command has no description, return null to avoid creating HTML elements for it
    }
    const commandElement = document.createElement("div");
    commandElement.classList.add("command");

    const nameElement = document.createElement("h2");
    nameElement.textContent = `/${command.name}`; // Notation to display the command name
    commandElement.appendChild(nameElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = command.description;
    commandElement.appendChild(descriptionElement);

    // If the command has subcommands, add a button to toggle them
    if (command.options && command.options.length > 0) {
      const subcommandsList = createSubcommandsList(command.options, command.name);

      const toggleButton = document.createElement("button");
      toggleButton.textContent = "View subcommands";
      toggleButton.classList.add("toggle-button"); // Add the toggle-button class to the button

      toggleButton.addEventListener("click", () => {
        subcommandsList.style.display = subcommandsList.style.display === "none" ? "block" : "none";
        toggleButton.textContent = subcommandsList.style.display === "none" ? "View subcommands" : "Hide subcommands";
      });

      commandElement.appendChild(toggleButton);
      commandElement.appendChild(subcommandsList);
    }

    return commandElement;
  }

  // Generate HTML elements for each command and add them to the DOM
  function renderCommands(commands) {
    commandsListElement.innerHTML = ""; // Clear previous commands
    commands.forEach((command) => {
      const commandElement = createCommandElement(command);
      if (commandElement) {
        commandsListElement.appendChild(commandElement);
      }
    });
  }

  // Event listener for the search button
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCommands = commandsData.filter((command) => command.name.toLowerCase().includes(searchTerm));
    renderCommands(filteredCommands);
  });

  // Initial rendering of all commands on page load
  renderCommands(commandsData);
});
