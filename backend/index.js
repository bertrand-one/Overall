const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'overall'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Set up express-session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  // Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.clearCookie('connect.sid'); // Clear the cookie (optional but recommended)
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
  

app.get('/', (req, res) => {
    res.send('Overall Backend is working');
});

// Update login route to store user_id in session
app.post('/login', (req, res) => {
    const values = [req.body.names,req.body.password];
    const sql = 'SELECT * FROM users WHERE names = ? AND password = ?';
    db.query(sql, values, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) {
        req.session.user = { id: results[0].id, names: results[0].names, profile: results[0].image };  // Store user_id in session
        res.json({ loggedIn: true, user: req.session.user });
      } else {
        res.json({ loggedIn: false, message: 'Invalid credentials' });
      }
    });
  });

  // Get user data to frontend
app.get('/profile', (req, res) => {
   const values = {
       "id":req.session.user.id,
       "profile":req.session.user.profile,
   }

   return res.json(values);
})
  

// Add work to database
app.post('/add_work', (req, res) => {
    const values = [
        req.body.ab,
        req.body.name,
        req.body.desc,
        req.body.client,
        req.body.start,
        req.body.end,
        req.body.tec,
        req.session.user.id
    ];
    const check = [values[0], values[1], values[7]];

    // Check if the work already exists
    const query = 'SELECT * FROM work WHERE `work_ab`=? AND `work_name`=? AND `userId`=?';
    db.query(query, check, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ error: 'Work already exists!' });
        }

        // If the work does not exist, insert the new record
        const sql = "INSERT INTO work(`work_ab`,`work_name`,`work_desc`,`client`,`start_date`,`end_date`,`technologies`,`userId`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ message: "Something went wrong: " + err });
            }
            return res.json({ success: "Work added successfully" });
        });
    });
});




//fetch work from database
app.get("/work", (req,res) => {
    const userId = req.session.user.id;
    const sql = "SELECT * FROM work WHERE userId=? ORDER BY work_id DESC";
    db.query(sql, userId, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})


//delete work 
app.delete("/delete/:id", (req,res) => {
    const id = req.params.id;

    const sql = "DELETE from work where `work_id` = ?";

    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error have been occured "+err});
        return res.json(result);
     })
})


//fetch the data of selected work
app.get("/get_work/:id", (req,res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM work where `work_id` = ?";
    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})


// Add worker to database
app.post('/add_worker', (req, res) => {
    const values = [
        req.body.names,
        req.body.email,
        req.body.telephone,
        req.body.national,
        req.body.job,
        req.session.user.id
    ];
    const check = [values[1],values[5]];

    // Check if the work already exists
    const query = 'SELECT * FROM workers WHERE `worker_email`=? AND `userId`=?';
    db.query(query, check, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ error: 'Worker already exists!' });
        }

        // If the work does not exist, insert the new record
        const sql = "INSERT INTO workers(`worker_names`,`worker_email`,`worker_tel`,`worker_national_id`,`worker_job`,`userId`) VALUES(?, ?, ?, ?, ?, ?)";
        
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ message: "Something went wrong: " + err });
            }
            return res.json({ success: "Worker added successfully" });
        });
    });
});

//fetch worker from database
app.get("/worker", (req,res) => {
    const userId = req.session.user.id;
    const sql = "SELECT * FROM workers WHERE userId=?";
    db.query(sql,userId, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})

//delete work 
app.delete("/delete_worker/:id", (req,res) => {
    const id = req.params.id;

    const sql = "DELETE from workers where `worker_id` = ?";

    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error have been occured "+err});
        return res.json(result);
     })
})


// edit worker to database
app.put('/edit_worker', (req, res) => {
    const values = [
        req.body.names,
        req.body.email,
        req.body.tel,
        req.body.national,
        req.body.job,
        req.body.id
    ];
        const sql = "UPDATE workers SET `worker_names`=?,`worker_email`=?,`worker_tel`=?,`worker_national_id`=?,`worker_job`=? WHERE `worker_id`=?";
        
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ message: "Something went wrong: " + err });
            }
            return res.json({ success: "Worker edit successfully" });
        });
    
});


//fetch the data of selected worker
app.get("/get_worker/:id", (req,res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM workers where `worker_id` = ?";
    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})


//fetch the task of selected worker
app.get("/fetch_task/:id", (req,res) => {
    const id = req.params.id;

    const sql = "SELECT tasks.*,work.* FROM tasks JOIN work ON work.work_id=tasks.work_id where tasks.worker_id = ?";
    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})


// Add task to database
app.post('/add_task', (req, res) => {
    const values = [
        req.body.work,
        req.body.name,
        req.body.worker,
        req.body.submit,
        req.session.user.id
    ];

    // Check if the work already exists
    const query = 'SELECT * FROM tasks WHERE `work_id`=? AND `task_name`=? AND `worker_id`=? AND `submit_date`=? AND `userId`=?';
    db.query(query, values, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ error: 'Task already exists!' });
        }

        // If the work does not exist, insert the new record
        const sql = "INSERT INTO tasks(`work_id`,`task_name`,`worker_id`,`submit_date`,`status`,`accomplish_date`, `userId`) VALUES(?, ?, ?, ?, 'not started','none', ?)";
        
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ message: "Something went wrong: " + err });
            }
            return res.json({ success: "task added successfully" });
        });
    });
});


//fetch Task from database
app.get("/task", (req,res) => {
    const userId = req.session.user.id;
    const sql = "SELECT tasks.*,work.*,workers.* FROM tasks JOIN work ON work.work_id=tasks.work_id JOIN workers ON workers.worker_id=tasks.worker_id WHERE tasks.userId=? ORDER BY tasks.task_id desc";
    db.query(sql,userId, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})


//delete task 
app.delete("/delete_task/:id", (req,res) => {
    const id = req.params.id;

    const sql = "DELETE from tasks where `task_id` = ?";

    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error have been occured "+err});
        return res.json(result);
     })
})



//fetch the task of selected work
app.get("/get_task/:id", (req,res) => {
    const id = req.params.id;

    const sql = "SELECT tasks.*,workers.* FROM tasks JOIN workers ON workers.worker_id=tasks.worker_id where tasks.work_id = ?";
    db.query(sql,id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})


//work percentage api
app.get("/percentage/:id", (req,res) => {
    const id = [req.params.id,req.session.user.id];
    const tasks = "SELECT * FROM tasks WHERE work_id=? AND userId=?";
    const comp = "SELECT * FROM tasks WHERE status='completed' AND work_id=? AND userId=?";
    const prog = "SELECT * FROM tasks WHERE status='inprogress' AND work_id=? AND userId=?";
    db.query(tasks, id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        const countTasks = result.length;

        
     db.query(comp, id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        const countComp = result.length;

        
     db.query(prog, id, (err, result) => {
        if(err) res.json({message: "server error"+err});
        const countProg = result.length/2;

        
     const perce = Math.round((countComp + countProg)/countTasks*100);
     return res.json(perce);
     })
     })

     })
})


// Add department to database
/*app.post('/add_department', (req, res) => {
    const values = [
        req.body.name,
        req.body.type,
        req.session.user.id
    ];
    const check = [values[0], values[2]];

    // Check if the department already exists
    const query = 'SELECT * FROM departments WHERE `name`=? AND `user_id`=?';
    db.query(query, check, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ error: 'Department already exists!' });
        }

        // If the department does not exist, insert the new record
        const sql = "INSERT INTO departments(`name`,`type`,`user_id`) VALUES(?, ?, ?)";
        
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ message: "Something went wrong: " + err });
            }
            return res.json({ success: "Department added successfully" });
        });
    });
});*/



//fetch department from database
app.get("/department", (req,res) => {
    const userId = req.session.user.id;
    const sql = "SELECT * FROM departments WHERE user_id=? ORDER BY id DESC";
    db.query(sql, userId, (err, result) => {
        if(err) res.json({message: "server error"+err});
        return res.json(result);
     })
})

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
  });
  const upload = multer({ storage });
  
  // Route for image upload
  app.post('/add_department', upload.single('image'), (req, res) => {
    const { name, type } = req.body;
    const userId = req.session.user ? req.session.user.id : null;
  
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized. Please log in.' });
    }
  
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded.' });
    }
  
    const imagePath = req.file.filename;
    const values = [name, type, userId, imagePath];
  
    const sql = "INSERT INTO departments(`name`,`type`,`user_id`,`image`) VALUES(?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send({ error: 'Database error.' });
      }
      res.send({ message: 'File uploaded successfully', file: imagePath });
    });
  });
  
  // Serve static files (for accessing uploaded images)
  app.use('/uploads', express.static('uploads'));
  



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
