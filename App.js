import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './Header';

const items = [
  { key: 1507129580608, text: 'Buy bread', complete: false },
  { key: 1507129597587, text: 'Walk the dog', complete: false }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items, text: '' };
  }

  onChangeText(text) {
    this.setState({ text });
  }

  onAddItem() {
    const newItem = { key: Date.now(), text: this.state.text, complete: false };
    const newItems = [...this.state.items, newItem];
    this.setState({ items: newItems, text: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          text={this.state.text}
          onChangeText={this.onChangeText.bind(this)}
          onAddItem={this.onAddItem.bind(this)}
        />
        <FlatList
          style={styles.itemList}
          data={this.state.items}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemList: {
    width: '100%'
  },
  item: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  itemText: {
    fontSize: 24,
    color: '#444'
  }
});
