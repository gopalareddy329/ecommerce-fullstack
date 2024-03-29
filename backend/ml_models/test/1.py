def predict_user_cluster(request):
    user=User.objects.get(username="pmallireddy329@gmail.com")
    category_counts = Product.objects.filter(purchases__user__id=11).annotate(category_name=F('category'),total_spent=Sum(F('purchases__quantity')*random.randint(190,250) )).values('category_name', 'total_spent')
    total_spent_sum = sum(category['total_spent'] for category in category_counts)
    User_input = pd.DataFrame([[0, 'Basic', 'single', 800,total_spent_sum]], columns=['year_birth', 'education', 'marital_status', 'income','expenses'])
    User_input['education'] = label_encoder.fit_transform(User_input['education'])
    User_input['marital_status'] = label_encoder.fit_transform(User_input['marital_status'])
    pred_cluster = model.predict(User_input)[0]+1
    pred_cl_details = clusters[clusters['Cluster'] == pred_cluster]
    products_col = ["wines","fruits","meat","fish","sweet","gold"]
    products_bought = pred_cl_details[products_col].sum()
    prod_bought = products_bought.replace("Mnt", "")
    total_amt = prod_bought.sum()
    percent_products_bought = ((prod_bought / total_amt) * 100).sort_values(ascending=False)
    products=get_products_with_percentage(percent_products_bought)
    random.shuffle(products)
    serial=ProductSerializer(products,many=True)
    return Response({"result":serial.data})