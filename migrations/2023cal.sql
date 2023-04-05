CREATE TABLE #RowsInserted (Id INT, name VARCHAR);

DELETE FROM [calendar].[category];

INSERT INTO [calendar].[category] (user_id, name, icon, color)
OUTPUT INSERTED.Id, INSERTED.name INTO #RowsInserted
VALUES (1, 'Statuatory Holiday', 'CircleIcon', 'black'),
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

INSERT INTO [calendar].[event]
VALUES 
(1, '2023-03-03T00:00:00.0000000', 
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Statuatory Holiday'),
'', 0),
(1, '2023-03-04T00:00:00.0000000',
(SELECT Id FROM #RowsInserted WHERE #RowsInserted.name = 'Office Closed'),
'', 0)
;

