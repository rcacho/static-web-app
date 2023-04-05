CREATE TABLE #RowsInserted (Id INT, name VARCHAR(255));

DELETE FROM [calendar].[category];

INSERT INTO [calendar].[category] (user_id, name, icon, color)
OUTPUT INSERTED.id, INSERTED.name INTO #RowsInserted
VALUES (1, 'Statutory holiday', 'CircleIcon', 'black'),
(1, 'Month End', 'CloseIcon', 'black'),
(1, 'Plan', 'HexagonIcon', '#2678F3'),
(1, 'EPSP', 'CropSquareIcon', 'black'),
(1, 'GROUP Board Meeting', 'ArrowUpwardIcon', 'red'),
(1, 'ASHCO Board Meeting', 'ArrowUpwardIcon', 'black'),
(1, 'Management Meeting', 'StarIcon', '#FF5F1F'),
(1, 'Expense Cutoff','SquareIcon', '#ffd700'),
(1, 'Annual General Meeting', 'GroupsIcon', 'black'),
(1, 'Preliminary Forecast', 'SpaIcon', '#468a65'),
(1, 'Forecast', 'SpaIcon', '#FF80ED'),
(1, 'UBAR Distribution', 'PaidIcon', '#468a65'),
(1, 'Office Closed', 'CloudIcon', '#2678F3');

SELECT * FROM #RowsInserted;

INSERT INTO [calendar].[event] (user_id, event_date, category_id, event_description, is_deleted)
VALUES 
(1, '2023-01-02T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'), --
'', 0),
(1, '2023-01-06T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-01-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-01-20T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-02-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-02-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-02-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-02-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-02-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-02-15T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'ASHCO Board Meeting'),--
'', 0),
(1, '2023-02-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'GROUP Board Meeting'),--
'', 0),
(1, '2023-02-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-02-20T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'), --
'', 0),
(1, '2023-02-24T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'EPSP'),--
'', 0),
(1, '2023-03-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-03-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-03-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-03-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-03-31T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-03-31T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-04-07T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-04-10T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-04-12T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Preliminary Forecast'),--
'', 0),
(1, '2023-04-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-04-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Forecast'),--
'', 0),
(1, '2023-04-28T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-04-28T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-05-08T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Group Board Meeting'),--
'', 0),
(1, '2023-05-10T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-05-11T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-05-12T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-05-12T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Group Board Meeting'),--
'', 0),
(1, '2023-05-12T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'ASHCO Board Meeting'),--
'', 0),
(1, '2023-05-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'ASHCO Board Meeting'),--
'', 0),
(1, '2023-05-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Annual General Meeting'),--
'', 0),
(1, '2023-05-22T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-06-02T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-06-02T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-06-12T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-06-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-06-30T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-06-30T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-07-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-07-10T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-07-12T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Preliminary Forecast'),--
'', 0),
(1, '2023-07-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-07-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Forecast'),
'', 0),
(1, '2023-07-28T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-07-28T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-08-07T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-08-08T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-08-11T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-08-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-08-15T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-08-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'ASHCO Board Meeting'),--
'', 0),
(1, '2023-08-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Group Board Meeting'),--
'', 0),
(1, '2023-08-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'ASHCO Board Meeting'),--
'', 0),
(1, '2023-08-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Group Board Meeting'),--
'', 0),
(1, '2023-09-01T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-09-01T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-09-04T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-09-11T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-09-15T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-09-29T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-09-29T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-10-09T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-10-10T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-10-11T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Preliminary Forecast'),--
'', 0),
(1, '2023-10-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-10-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Forecast'),--
'', 0),
(1, '2023-10-20T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Plan'),--
'', 0),
(1, '2023-11-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-11-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-11-13T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-11-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-11-15T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-11-16T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Management Meeting'),--
'', 0),
(1, '2023-11-17T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-11-30T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'EPSP'),--
'', 0),
(1, '2023-12-01T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-12-01T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0),
(1, '2023-12-11T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'UBAR Distribution'),--
'', 0),
(1, '2023-12-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'ASHCO Board Meeting'),--
'', 0),
(1, '2023-12-14T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Group Board Meeting'),--
'', 0),
(1, '2023-12-15T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Expense Cutoff'),--
'', 0),
(1, '2023-12-25T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-12-26T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statutory holiday'),--
'', 0),
(1, '2023-12-27T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Office Closed'),--
'', 0),
(1, '2023-12-28T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Office Closed'),--
'', 0),
(1, '2023-12-29T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Office Closed'),--
'', 0),
(1, '2023-12-31T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Month End'),--
'', 0);

