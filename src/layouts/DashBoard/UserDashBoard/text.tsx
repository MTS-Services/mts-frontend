<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Today Task Management</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <style>
    body { padding: 2rem; }
    .select2-container--bootstrap5 .select2-selection {
      min-height: 38px;
    }
    .select2-selection__choice { background-color: #0d6efd; border-color: #0d6efd; }
  </style>
</head>
<body>
  <h2 class="mb-4">Assign Team Members</h2>

  <form id="assign-form" class="mb-4">
    <label for="assign-project" class="form-label">Select Project</label>
    <select id="assign-project" class="form-select mb-3" required>
      <option value="">-- Select a Project --</option>
    </select>

    <label for="assign-members" class="form-label">Select Team Members</label>
    <select id="assign-members" class="form-select mb-3" multiple required></select>

    <button type="submit" class="btn btn-primary">Assign</button>
  </form>

  <h3 class="mt-5">📋 Current Tasks</h3>
  <table class="table table-bordered mt-3">
    <thead class="table-light">
      <tr>
        <th>Project ID</th>
        <th>Client</th>
        <th>Expected Finish</th>
        <th>Last Update</th>
        <th>Assignees</th>
      </tr>
    </thead>
    <tbody id="task-table"></tbody>
  </table>

  <!-- Dependencies -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script>
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzNVdFaFJoR05BWm1BSjZUNWMyY0dJdHF2QlgyIiwiaWF0IjoxNzQ2ODQzOTAzLCJleHAiOjE3NDY4ODcxMDN9.rUKqI4ZkHxo25spTp1QZojlt5DO51giIANYpCjUrntc'; // JWT should be stored here
    let taskData = {};
    let teamMembers = [];

    async function fetchTasks() {
      const res = await fetch("/api/today-task", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      taskData = data.tasks || {};
      teamMembers = data.team_members || [];
      populateProjectSelect();
      renderTaskTable();
    }

    function populateProjectSelect() {
      const $project = $("#assign-project");
      $project.empty().append('<option value="">-- Select a Project --</option>');
      Object.values(taskData).forEach(t =>
        $project.append(
          `<option value="${t.project_id}">${t.project_id} - ${t.client_name}</option>`
        )
      );
      $project.select2({ theme: "bootstrap5" });
    }

    $("#assign-project").on("change", function () {
      const pid = $(this).val();
      populateMembers(pid);
    });

    function populateMembers(projectId) {
      const assignedIds = new Set(
        (taskData[projectId]?.assign || [])
          .map(a => a.id)
          .filter(id => id !== null)
      );

      const $members = $("#assign-members");
      $members.empty();

      teamMembers
        .filter(member => !assignedIds.has(member.id))
        .forEach(member => {
          const name = `${member.first_name} ${member.last_name}`;
          $members.append(
            `<option value="${member.id}">${name} (${member.email})</option>`
          );
        });

      $members.select2({
        placeholder: "Select team members",
        theme: "bootstrap5"
      });
    }

    $("#assign-form").on("submit", async function (e) {
      e.preventDefault();
      const project_id = $("#assign-project").val();
      const team_member_ids = $("#assign-members").val().map(Number);

      const res = await fetch("/api/today-task/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ project_id, team_member_ids })
      });

      const data = await res.json();
      alert(data.message || "Team members assigned!");
      fetchTasks(); // Reload after assigning
    });

    function renderTaskTable() {
      const tbody = $("#task-table");
      tbody.empty();

      Object.values(taskData).forEach(task => {
        const assignees = task.assign
          .map(a => a.first_name ? `${a.first_name} ${a.last_name} (${a.ops_status || '-'})` : 'Unassigned')
          .join("<br>");

        tbody.append(`
          <tr>
            <td>${task.project_id}</td>
            <td>${task.client_name}</td>
            <td>${task.expected_finish_time || "-"}</td>
            <td>${task.last_update ? new Date(task.last_update).toLocaleDateString() : "-"}</td>
            <td>${assignees}</td>
          </tr>
        `);
      });
    }

    // Initialize
    fetchTasks();
  </script>
</body>
</html>
